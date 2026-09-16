// One-time script — run this locally with `node setAdmin.cjs`, then delete it
// or keep it out of git. Never run this in the browser or commit the
// service account key to GitHub.

const { initializeApp, cert } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const serviceAccount = require('./serviceAccountKey.json')

const TARGET_UID = '08FsuhUC5fe4qMAdmWIKguZmeee2'

initializeApp({
  credential: cert(serviceAccount),
})

getAuth()
  .setCustomUserClaims(TARGET_UID, { admin: true })
  .then(() => {
    console.log(`✅ ${TARGET_UID} is now an admin.`)
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Failed:', err)
    process.exit(1)
  })