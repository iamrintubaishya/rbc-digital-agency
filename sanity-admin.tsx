import React from 'react'
import { createRoot } from 'react-dom/client'
import { CustomBlogPostInput } from './sanity/components/CustomBlogPostInput'

// Simple admin interface for managing your Neon blog posts
function SanityAdmin() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>RBC Digital Agency - Blog Management</h1>
      <p>Manage your blog posts stored in Neon database through this beautiful interface.</p>
      <CustomBlogPostInput />
    </div>
  )
}

// Initialize the admin interface
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<SanityAdmin />)
}