import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { blogPostType } from './sanity/schemas/blogPost'

export default defineConfig({
  name: 'rbc-digital-agency',
  title: 'RBC Digital Agency CMS',
  
  projectId: 'your-project-id', // Will be set up after creating Sanity project
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: [blogPostType],
  },
  
  // Custom API endpoints to connect to your Neon database
  api: {
    projectId: 'your-project-id',
    dataset: 'production',
  }
})