export default defineAppConfig({
  ui: {
    button: {
      variants: {
        size: {
          '2xl': {
            base: 'px-3 py-2 text-2xl gap-2',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6',
          },
        },
      },
    },
  },
})
