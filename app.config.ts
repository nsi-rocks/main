export default defineAppConfig({
  docus: {
    title: 'NSI Rocks !',
    description: "Site dédié à l'enseignement de la SNT et de la NSI. Because NSI Rocks !",
    url: 'https://nsi.rocks',
    layout: {
      fluid: true
    },
    github: {
      root: 'content',
      edit: true
    },
    socials: {
      github: 'mathieunicolas/alloe'
    },
    header: {
      showLinkIcon: true,
      logo: true
    },
    footer: {
      credits: {
        text: 'Site réalisé par M. NICOLAS',
        icon: 'IconNsi',
        href: 'https://nsi.rocks'
      }
    },
    aside: {
      level: 1,
      collapsed: true
    }
  }
})
