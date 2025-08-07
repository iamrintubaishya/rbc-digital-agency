import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'rbc-digital-agency',
  title: 'RBC Digital Agency - Blog Management',

  projectId: '3prkr232',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Studio configuration
  studio: {
    components: {
      // Custom logo and branding
      navbar: () => null,
    }
  },

  // Document actions
  document: {
    actions: (prev, context) => {
      return prev
    }
  }
})