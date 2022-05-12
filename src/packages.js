const http = require('http')
const { resolve } = require('path')

const packageUrl = 'http://zazuapp.org/api/packages.json'
let packages = null

const self = {
  refresh: (cwd) => {
    return new Promise((resolve, reject) => {
      http.get(packageUrl, (response) => {
        const chunks = []
        response.on('data', (chunk) => {
          chunks.push(chunk.toString())
        })
        response.on('end', () => {
          packages = JSON.parse(chunks.join('')).packages
          resolve(packages)
        })
      }).on('error', function (err) {
        console.log(err);
      });
    }).on('error', function (err) {
      console.log(err);
    });
  },
  get: (cwd) => {
    try{
      return packages ? Promise.resolve(packages) : self.refresh(cwd)
    }catch{
      console.info('Cant get all packages from net')
      return
    }
  },
}

module.exports = self
