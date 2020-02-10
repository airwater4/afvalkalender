if ('serviceWorker' in navigator) {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', event => {
    deferredPrompt = event
    setTimeout(() => {
      showInstallPromotion()
    }, 30000)
  })

  function showInstallPromotion() {
    const installPopup = document.querySelector('#install-popup')
    const installButton = document.querySelector('#install')
    const skipInstallButton = document.querySelector('#skip-install')

    skipInstallButton.addEventListener('click', () =>
      installPopup.classList.add('hidden')
    )
    installButton.addEventListener('click', e => {
      installPopup.classList.add('hidden')
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(choiceResult => {
        deferredPrompt = null
      })
    })

    installPopup.classList.remove('hidden')
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      registration => {
        console.info(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      err => {
        console.warn('ServiceWorker registration failed: ', err)
      }
    )
  })
}
