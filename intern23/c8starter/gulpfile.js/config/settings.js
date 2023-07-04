const path = require('path')
const pkg = require('../../package')

module.exports = {
  'deploy': {
    'host': '192.168.159.97',
    'user': 'ubuntu',
    'key': process.env.HTML_SERVER_KEY || '',
    'remotePath': `/srv/sites/html.carbon8dev.com/${pkg.name}`
  },
  html: {
    includePaths: [

    ]
  },
  styles: {
    includePaths: [

    ]
  },
  tailwind: {
    includePaths: [

    ]
  },
  scripts: {
    includePaths: [

    ]
  },
  scriptsMb: {
    includePaths: [

    ]
  },
  scriptsHome: {
    includePaths: [

    ]
  },
  scriptsHomeMb: {
    includePaths: [

    ]
  },
  webpack: {
    includePaths: [

    ]
  },
  browserSync: {

  }
}
