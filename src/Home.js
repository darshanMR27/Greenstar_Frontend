// import React, {Component} from 'react';
// import { Provider, Heading, Subhead } from '@rebass/grid';
// import {
//   Hero, CallToAction, ScrollDownIndicator, Section, Checklist
// } from 'react-landing-page';

// class Home extends Component {
//     render() {
//         const featherCheckmark = <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24" height="24"
//             viewBox="0 0 24 24"
//             fill="none" stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             >
//             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//             <polyline points="22 4 12 14.01 9 11.01"/>
//             </svg>
//         return (
//             <Provider>
//                 <Hero
//                 color="black"
//                 bg="white"
//                 backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
//                 >
//                     <Heading>Name of your app</Heading>
//                     <Subhead>a couple more words</Subhead>
//                     <CallToAction href="/getting-started" mt={3}>Get Started</CallToAction>
//                     <ScrollDownIndicator/>
//                 </Hero>
//                 <Section width={1}
//                 heading='Why pick this library?'
//                 subhead='maybe this will help'>
//                 <Checklist children={[
//                     'Open Source',
//                     'React best practices',
//                     'Practical API'
//                 ]} checkmark={featherCheckmark}/>
//                 </Section>
//             </Provider>
//         );
//     }
// }
// export default Home;