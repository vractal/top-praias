const rp = require('request-promise');
const $ = require('cheerio');
const admin = require('firebase-admin');
var serviceAccount = require("./credentials.json");

require('dotenv').config('/.env')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.BUCKET_NAME
});

const imgUploader = require('./imageUploader')

var firestore = admin.firestore()


const url = 'https://www.guiaviajarmelhor.com.br/melhores-praias-brasil/';

const parseBeaches = html => {
  let beaches = []
  let missed = 0
    $('.single-body', html).children('h3').each(function(i) {
          console.log(`Parsing ${i} beach entry... \n `)
          const el = $(this)
          const parsedTitle = /(.+?)\s*–\s*(.+?),\s*(.+)\s*/gm.exec(el.text())
          try{
            const name = parsedTitle[1]
            const location = parsedTitle[2]
            const state = parsedTitle[3]
            const description = el.next('div').next().text()
            const imgSrc = `https://www.guiaviajarmelhor.com.br${el.next('div').children('img').attr('src')}`
            if (name && location && state && description && imgSrc) {
              beaches = [...beaches,{ name, description, location: parsedTitle[2], state: parsedTitle[3].trim(), imgSrc }]
            } else {
              throw "Incomplete..."
            }
          } catch (error){
            console.log('Missed one', error)
            missed += 1
          }


      })
      console.log(`All Parsed. Only missed ${missed}!`)
      return beaches
  }

  const processBeaches = async (beaches) => {
    let missed = 0
    console.log('Now starting image and database process... \n ')
    for (beach of beaches) {
      const { name, imgSrc } = beach
      console.log(`Processing ${name}..`)
      console.log(beach)
      const id = name.replace(/\s/g,'')
      let doc = firestore.doc(`beaches/${id}`)
      try {
        const storedImage = await imgUploader(imgSrc, id)
        console.log('Adding beach to database...')
        await doc.set({...beach, imgSrc: storedImage})
        console.log('Done! \n')
      } catch (error) {
        console.log('Missed one.',error)
        missed += 1
      }
    }
    console.log(`Processing done! Missed ${missed} more.`)
  }


  rp(url)
    .then(html => {
      console.log("Page Fetched \n")
      const beaches = parseBeaches(html)
      processBeaches(beaches)
      })
    .catch(error => {
      throw error
    })
