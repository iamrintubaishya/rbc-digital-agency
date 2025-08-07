import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { blogPostType } from './sanity/schemas/blogPost'

export default defineConfig({
  name: 'rbc-digital-agency',
  title: 'RBC Digital Agency CMS',
  
  projectId: '3prkr232',
  dataset: 'production',
  
  studioHost: 'rbc-digital-agency',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: [blogPostType],
  },
  
  // Custom API configuration
  api: {
    projectId: '3prkr232',
    dataset: 'production',
  }
})