import Head from 'next/head'
//import logo from '../public/logo.png'
const Meta=({title,keywords,description,image,url})=> {
    return (
        <Head>
       {/*primary tags*/}
        <meta name="theme-color" content="#2B3074"></meta>
        <meta name="msapplication-navbutton-color" content="#2B3074"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="#2B3074"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='keywords' content={keywords}/>
        <meta name='description' content={description}/>
        <meta charSet='utf-8'/>
        <link rel='icon' href='/favicon.ico'/>
        <title>{title}</title>

        {/*secondary tags*/}
<meta property="og:type" content="article"/>
<meta property="og:title" content={title}/>
<meta property="og:url" content={url} />
<meta property="og:description" content={description}/>
<meta property="og:locale" content="en_US" />
{/*image!==false?<meta property="og:image" content={image}/>:null*/}



<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:title" content={title}/>
<meta property="twitter:description" content={description}/>
<meta name="twitter:url" content={url}></meta>
{/*image!==false?<meta property="twitter:image" content={image}/>:null*/}
        </Head>
       
    )
}
Meta.defaultProps={
    title : "RAM Tournaments - Risk-Adjusted Madness the Alternative to Typical Bracket Contests",
    keywords:"RAM Tournaments, Risk-Adjusted Madness the Alternative to Typical Bracket Contests",
    description:"RAM allows people from all circles to enjoy every round of major sports events with newfound excitement as you'll never have so much fun rooting for the underdogs.  It's the way your sports-viewing experience should be",
    //image:logo,
    url:'https://ramtournaments.netlify.app/'
}
export default Meta
