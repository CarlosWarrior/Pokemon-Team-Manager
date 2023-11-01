const dns = require('dns')
const net = require('net')
const disposableEmailDomains = require('disposable-email-domains')

exports.verify_email = async (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email))
        return false

    if(email.split("@").length -1 != 1)
        return false
    
    const [address, domain] = email.split("@")
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain))
        return false

    const DISPOSABLEcheck = !disposableEmailDomains.includes(domain)
    if(!DISPOSABLEcheck)
        return false

    const MXcheck = await new Promise((resolve, reject) => dns.resolveMx(domain, (err, mxRecords) => {
        console.log({mxRecords, err})
        if(err)
            resolve(null)
        if (mxRecords && mxRecords.length > 0){
            if(mxRecords[0].exchange && mxRecords[0].exchange != '')
                resolve(mxRecords)
            else
                resolve(null)
        }
        else
            resolve(null)
    }))
    if(!MXcheck)
        return false
    
    
    const hasCode = (message, code) => message.indexOf(`${code}`) === 0 || message.indexOf(`${code}\n`) > -1
    const SMTPcheck = await new Promise(resolve => {
        const exchange = MXcheck[0].exchange
        const socket = net.createConnection(25, exchange);
        let receivedData = false;
        socket.setEncoding('ascii');
        socket.setTimeout(10000);
        socket.on('error', error => {
            socket.emit('fail', error);
        })
        socket.on('close', hadError => {
            if (!receivedData)
                socket.emit('fail', 'Mail server closed connection without sending any data.');
        })
        socket.once('fail', message => {
            resolve(false)
            if (socket.writable && !socket.destroyed) {
                socket.write(`quit\r\n`)
                socket.end();
                socket.destroy()
            }
        })
        socket.on('success', () => {
            console.log("success")
            if (socket.writable && !socket.destroyed) {
                socket.write(`quit\r\n`);
                socket.end();
                socket.destroy();
            }
            resolve(true)
        })
        const commands = [
            `helo ${exchange}\r\n`,
            `mail from: <${email}>\r\n`,
            `rcpt to: <${email}>\r\n`,
        ]
        let i = 0
        socket.on('next', () => {
            if (i < 3) {
                if (socket.writable)
                    socket.write(commands[i++])
                else 
                    socket.emit('fail', 'SMTP communication unexpectedly closed.')
            }
            else 
                socket.emit('success')
            
        })
        socket.on('timeout', () => {
            socket.emit('fail', 'Timeout')
        })
        socket.on('connect', () => {
            socket.on('data', msg => {
                receivedData = true
                if (hasCode(msg, 220) || hasCode(msg, 250))
                    socket.emit('next', msg)
                else
                    socket.emit('fail', msg)
            })
        })
    })
    if(!SMTPcheck)
        return false

    const CATCHALLcheck = await new Promise(resolve => {
        const exchange = MXcheck[0].exchange
        const socket = net.createConnection({ host: exchange, port: 25 });
    
        let isNotCatchAll = true;
        socket.on('data', (data) => {
            const response = data.toString();
    
            if (response.startsWith('250')) {
                socket.write(`MAIL FROM:<test@example.com>\r\n`);
                socket.write(`RCPT TO:<nonexistentuser@${domain}>\r\n`);
            }
    
            if (response.includes('250'))
                isNotCatchAll = false
    
            socket.end();
        });

        socket.on('error', (err) => {
            console.log({err})
            resolve(false);
        });
    
        socket.on('end', () => {
            resolve(isNotCatchAll);
        })
    });

    if(!CATCHALLcheck)
        return false
    
    return MXcheck && SMTPcheck && CATCHALLcheck && DISPOSABLEcheck ? true : false
}