import { useEffect, useState } from "react";

const interfaceConfigOverwrite = {

    HIDE_INVITE_MORE_HEADER: false,
    TOOLBAR_BUTTONS: [
        'camera', 'closedcaptions', 'desktop', 'microphone', 'fullscreen',
        'fodeviceselection', 'hangup', 'profile', 'chat', 
        'etherpad', 'sharedvideo', 'settings', 'raisehand',
        'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
        'tileview',  'help', 'security'
    ],
}


export default function JitsiFrame({onHangUp, displayName, loader="loading"}) {


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let api;

        if (window.JitsiMeetExternalAPI) {
            const domain = 'meet.jit.si';
            const options = {
                roomName: '36b02031-72f1-400c-adb6-f5a5032c1622',
                parentNode: document.querySelector('.meet'),
                onload: () => setLoading(false),
                configOverwrite: {
                    enableWelcomePage:false
                },
                userInfo: {
                    displayName,
                },
                interfaceConfigOverwrite
            };
            api = new JitsiMeetExternalAPI(domain, options)
            
            api.addEventListener("videoConferenceLeft", onHangUp)
       
        }
        return () => api.dispose()
    }, [])
    
    return <div style={{height:'100vh', position:'relative', width:'100vw', display:'grid', placeItems:'center'}}>
        {loading && <div style={{ position: 'absolute', top: "50px", right: '50px' }}>{loader}</div>}
        <div style={{ height: '100%', width: '100%' }} className="meet" />
    </div>

    
}

