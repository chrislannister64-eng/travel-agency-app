// Paystack's checkout is a script-injected popup, not an npm package.
// This loads it once (if not already present) and wraps it in a promise
// so calling code can just `await payWithPaystack(...)`.

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = resolve
    script.onerror = () => reject(new Error('Could not load Paystack'))
    document.body.appendChild(script)
  })
}

export async function payWithPaystack({ email, amountKobo, reference, onSuccess, onClose }) {
  await loadPaystackScript()

  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email,
    amount: amountKobo, // Paystack expects the smallest currency unit (kobo, pesewas, cents)
    ref: reference,
    callback: (response) => onSuccess(response),
    onClose: () => onClose?.(),
  })

  handler.openIframe()
}
