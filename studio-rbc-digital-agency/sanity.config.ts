import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'rbc-digital-agency-studio',
  title: 'RBC Digital Agency - Content Management',

  projectId: '3prkr232',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio branding
  studio: {
    components: {
      // Custom navbar
      navbar: (props) => {
        return (
          <div style={{ padding: '8px 16px', background: '#1a1a1a', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '14px' }}>RBC Digital Agency - Blog Management</h3>
          </div>
        )
      }
    }
  }
})