import axios from 'axios';
class StrapiService {
    constructor() {
        this.baseURL = process.env.STRAPI_API_URL || 'http://localhost:1338';
        this.apiToken = process.env.STRAPI_API_TOKEN;
        this.client = axios.create({
            baseURL: `${this.baseURL}/api`,
            headers: {
                'Content-Type': 'application/json',
                ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
            },
        });
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            console.error('Strapi API Error:', error.response?.data || error.message);
            throw error;
        });
    }
    async getArticles(params) {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page)
                queryParams.append('pagination[page]', params.page.toString());
            if (params?.pageSize)
                queryParams.append('pagination[pageSize]', params.pageSize.toString());
            if (params?.sort) {
                params.sort.forEach(s => queryParams.append('sort', s));
            }
            if (params?.populate) {
                params.populate.forEach(p => queryParams.append('populate', p));
            }
            if (params?.filters) {
                Object.entries(params.filters).forEach(([key, value]) => {
                    queryParams.append(`filters[${key}][$eq]`, value);
                });
            }
            const response = await this.client.get(`/articles?${queryParams.toString()}`);
            return response.data;
        }
        catch (error) {
            if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
                console.warn('Strapi server not available. Returning empty results.');
                return { data: [] };
            }
            throw new Error(`Failed to fetch articles from Strapi: ${error.message}`);
        }
    }
    async getArticleBySlug(slug) {
        try {
            const response = await this.client.get(`/articles?filters[slug][$eq]=${slug}&populate=*`);
            const articles = response.data.data;
            return {
                data: articles.length > 0 ? articles[0] : null,
                meta: response.data.meta,
            };
        }
        catch (error) {
            if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
                console.warn('Strapi server not available. Returning null.');
                return { data: null };
            }
            throw new Error(`Failed to fetch article from Strapi: ${error.message}`);
        }
    }
    async createArticle(articleData) {
        try {
            const response = await this.client.post('/articles', {
                data: articleData,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to create article in Strapi: ${error.message}`);
        }
    }
    async updateArticle(id, articleData) {
        try {
            const response = await this.client.put(`/articles/${id}`, {
                data: articleData,
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to update article in Strapi: ${error.message}`);
        }
    }
    async deleteArticle(id) {
        try {
            await this.client.delete(`/articles/${id}`);
        }
        catch (error) {
            throw new Error(`Failed to delete article from Strapi: ${error.message}`);
        }
    }
    async syncArticleToDatabase(article, db) {
        try {
            const { blogPosts } = await import('@shared/schema');
            const { eq } = await import('drizzle-orm');
            const existingPost = await db
                .select()
                .from(blogPosts)
                .where(eq(blogPosts.strapiId, article.id.toString()))
                .limit(1);
            const postData = {
                title: article.title,
                slug: article.slug,
                content: article.content,
                excerpt: article.excerpt || null,
                author: article.author || null,
                coverImage: article.cover?.url ? `${this.baseURL}${article.cover.url}` : null,
                strapiId: article.id.toString(),
                publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
                updatedAt: new Date(),
            };
            if (existingPost.length > 0) {
                await db
                    .update(blogPosts)
                    .set(postData)
                    .where(eq(blogPosts.strapiId, article.id.toString()));
            }
            else {
                await db.insert(blogPosts).values({
                    ...postData,
                    createdAt: new Date(article.createdAt),
                });
            }
        }
        catch (error) {
            console.error('Failed to sync article to database:', error.message);
            throw error;
        }
    }
    isEnabled() {
        // Only consider Strapi enabled if we have the API token
        // Without the token, we should use local database
        return !!this.apiToken;
    }
    getBaseURL() {
        return this.baseURL;
    }
}
export const strapiService = new StrapiService();
