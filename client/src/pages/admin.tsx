import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Shield, Database, Settings } from 'lucide-react';

export default function AdminPage() {
  const [isProduction, setIsProduction] = useState(false);
  const [strapiUrl, setStrapiUrl] = useState('');

  useEffect(() => {
    const isProd = import.meta.env.PROD;
    setIsProduction(isProd);
    
    // Set Strapi URL based on environment
    if (isProd) {
      setStrapiUrl(import.meta.env.VITE_STRAPI_URL || '/admin');
    } else {
      setStrapiUrl('/admin');
    }
  }, []);

  const handleAccessAdmin = () => {
    // Always use the new lightweight CMS admin
    const cmsUrl = 'https://rbc-strapi-cms.vercel.app/admin';
    window.open(cmsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Panel Access
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your content and website settings
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Strapi CMS Access */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Content Management
              </CardTitle>
              <CardDescription>
                Access Strapi CMS to manage blog posts, articles, and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Lightweight CMS Admin
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Access your serverless CMS to view and manage blog posts and articles.
                </p>
                <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• 5 professional blog posts included</li>
                  <li>• Fast serverless deployment</li>
                  <li>• Zero configuration required</li>
                  <li>• Compatible API structure</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleAccessAdmin} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open CMS Admin
              </Button>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Environment: Production
                <br />
                URL: https://rbc-strapi-cms.vercel.app/admin
              </div>
            </CardContent>
          </Card>

          {/* Website Settings */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-green-600" />
                Website Settings
              </CardTitle>
              <CardDescription>
                Configure website settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => window.open('https://rbc-strapi-cms.vercel.app/api/articles', '_blank')}
                  >
                    View API Data
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/'}
                  >
                    Back to Website
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <strong>Access Instructions:</strong>
                <br />
                • CMS Admin: Direct access to lightweight serverless CMS
                <br />
                • API Access: RESTful endpoints for blog content
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current configuration and connectivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-semibold text-blue-900 dark:text-blue-100">Main Website</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Running</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-semibold text-green-900 dark:text-green-100">Lightweight CMS</div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Operational
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-semibold text-purple-900 dark:text-purple-100">Database</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Connected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}