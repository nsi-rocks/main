export default defineAppConfig({
    ui: {
      primary: 'blue',
      gray: 'stone',
      variables: {
        light: {
          background: '255 255 255',
          foreground: 'var(--color-gray-700)'
        },
        dark: {
          background: 'var(--color-gray-900)',
          foreground: 'var(--color-gray-200)'
        },
        header: {
          height: '4rem'
        }
      },
      content: {
        prose: {
          code: {
            icon: {
              py: 'vscode-icons:file-type-python'
            }
          }
        }
      }
    }
  })
  