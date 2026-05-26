const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Send contact form via Web3Forms → info.zentrixagency@gmail.com (dashboard).
 */
export async function submitWeb3Form({ name, email, subject, message, service }) {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
        throw new Error('Web3Forms is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env')
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            subject: subject || (service ? `Project Inquiry: ${service}` : 'Website Contact'),
            message: service ? `${message}\n\n---\nService: ${service}` : message,
            replyto: email,
            from_name: name,
            botcheck: '',
        }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
        throw new Error(data.message || 'Could not send your message. Please try again.')
    }

    return data
}
