
// Data

export default defineAppConfig({
  docus: {
    title: 'NSI Rocks !',
    description: "Site dédié à l'enseignement de la SNT et de la NSI. Because NSI Rocks !",
    url: 'https://nsi.rocks',
    github: {
      owner: 'mathieunicolas',
      repo: 'nsi',
      branch: 'master'
    },
    header: {
      showLinkIcon: true,
      logo: true,
      fluid: true
    },
    footer: {
      credits: {
        text: 'Site réalisé par M. NICOLAS',
        icon: 'IconNsi',
        href: 'mailto:contact@nsi.rocks'
      },
      fluid: true
    },
    main: {
      fluid: true
    },
    aside: {
      level: 1,
      collapsed: true
    }
  },
})
