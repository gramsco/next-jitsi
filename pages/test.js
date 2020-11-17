import Head from 'next/head'
import { useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Jitsi = dynamic(() => import('../components/jitsiframe'), {ssr:false, loading:() => <div>mdr</div>})


export default function Test() {

    const [visible, setVisible] = useState(false)


    return <>
        <Head>
            <script on src="/scripts/jitsi.js" />
        </Head>
        {visible
            ? < Jitsi displayName="XDP" onHangUp={() => setVisible(false)} />
            : <button onClick={() => setVisible(true)}>Launch</button>
        }
</>
}