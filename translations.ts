export type Language = 'en' | 'or' | 'bn' | 'te';

export interface AppStrings {
    appTitle: string;
    newObservation: string;
    processingObservation: string;
    welcomeTitle: string;
    welcomeMessage: string;
    coastlineTitle: string;
    coastlinePara1: string;
    faunaTitle: string;
    faunaPara1: string;
    observationNameLabel: string;
    observationNamePlaceholder: string;
    saveObservation: string;
    cancel: string;
}

export const translations: Record<Language, AppStrings> = {
    en: {
        appTitle: 'Coastal Observer',
        newObservation: 'New Observation',
        processingObservation: 'Processing observation...',
        welcomeTitle: 'Explore India\'s Coasts',
        welcomeMessage: 'Capture and geotag your coastal discoveries, from vibrant marine life to unique geological formations.',
        coastlineTitle: 'The Magnificent Indian Coastline',
        coastlinePara1: 'Stretching over 7,500 kilometers, the Indian coastline is a diverse and dynamic ecosystem. From the rocky shores of the west to the sandy beaches and deltas of the east, it is home to a rich variety of flora and fauna.',
        faunaTitle: 'Coastal Wildlife',
        faunaPara1: 'The coastal areas are teeming with life. Look for Olive Ridley turtles on the shores of Odisha, discover colorful coral reefs in the Andaman islands, spot various species of crabs, and watch for migratory birds along the wetlands.',
        observationNameLabel: 'Observation Name (Optional)',
        observationNamePlaceholder: 'e.g., Starfish on the rocks',
        saveObservation: 'Save Observation',
        cancel: 'Cancel',
    },
    or: {
        appTitle: 'উপকୂଳ ପର୍ଯ୍ୟବେକ୍ଷକ',
        newObservation: 'ନୂଆ ପର୍ଯ୍ୟବେକ୍ଷଣ',
        processingObservation: 'ପର୍ଯ୍ୟବେକ୍ଷଣ ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି...',
        welcomeTitle: 'ଭାରତର ଉପକୂଳ ଅନୁସନ୍ଧାନ କରନ୍ତୁ',
        welcomeMessage: 'ଆପଣଙ୍କ ଉପକୂଳ ଆବିଷ୍କାରଗୁଡ଼ିକୁ କ୍ୟାପଚର୍ ଏବଂ ଜିଓଟ୍ୟାଗ୍ କରନ୍ତୁ, ସାମୁଦ୍ରିକ ଜୀବନଠାରୁ ଅନନ୍ୟ ଭୌଗୋଳିକ ଗଠନ ପର୍ଯ୍ୟନ୍ତ।',
        coastlineTitle: 'ବିଶାଳ ଭାରତୀୟ ଉପକୂଳ',
        coastlinePara1: '୭,୫୦୦ କିଲୋମିଟରରୁ ଅଧିକ ବିସ୍ତୃତ, ଭାରତୀୟ ଉପକୂଳ ଏକ ବିବିଧ ଏବଂ ଗତିଶୀଳ ପରିବେଶ। ପଶ୍ଚିମର ପଥୁରିଆ ତଟରୁ ପୂର୍ବର ବାଲୁକାମୟ ସମୁଦ୍ରକୂଳ ଏବଂ ତ୍ରିକୋଣଭୂମି ପର୍ଯ୍ୟନ୍ତ, ଏହା ବିଭିନ୍ନ ପ୍ରକାରର ଉଦ୍ଭିଦ ଓ ପ୍ରାଣୀଙ୍କ ବାସସ୍ଥଳୀ।',
        faunaTitle: 'ଉପକୂଳୀୟ ବନ୍ୟପ୍ରାଣୀ',
        faunaPara1: 'ଉପକୂଳ ଅଞ୍ଚଳଗୁଡ଼ିକ ଜୀବନରେ ପରିପୂର୍ଣ୍ଣ। ଓଡ଼ିଶାର ତଟରେ ଅଲିଭ୍ ରିଡଲେ କଇଁଛ ଖୋଜନ୍ତୁ, ଆଣ୍ଡାମାନ ଦ୍ୱୀପପୁଞ୍ଜରେ ରଙ୍ଗୀନ ପ୍ରବାଳ ଦେଖନ୍ତୁ, ବିଭିନ୍ନ ପ୍ରଜାତିର କଙ୍କଡା ଚିହ୍ନଟ କରନ୍ତୁ, ଏବଂ ଆର୍ଦ୍ରଭୂମିରେ ପ୍ରବାସୀ ପକ୍ଷୀ ଦେଖନ୍ତୁ।',
        observationNameLabel: 'ପର୍ଯ୍ୟବେକ୍ଷଣ ନାମ (ବୈକଳ୍ପିକ)',
        observationNamePlaceholder: 'ଯଥା, ପଥର ଉପରେ ତାରା ମାଛ',
        saveObservation: 'ପର୍ଯ୍ୟବେକ୍ଷଣ ସଞ୍ଚୟ କରନ୍ତୁ',
        cancel: 'ବାତିଲ କରନ୍ତୁ',
    },
    bn: {
        appTitle: 'উপকূল পর্যবেক্ষক',
        newObservation: 'নতুন পর্যবেক্ষণ',
        processingObservation: 'পর্যবেক্ষণ প্রক্রিয়া করা হচ্ছে...',
        welcomeTitle: 'ভারতের উপকূল অন্বেষণ করুন',
        welcomeMessage: 'আপনার উপকূলীয় আবিষ্কারগুলি ক্যাপচার এবং জিওট্যাগ করুন, প্রাণবন্ত সামুদ্রিক জীবন থেকে অনন্য ভূতাত্ত্বিক গঠন পর্যন্ত।',
        coastlineTitle: 'মহিমান্বিত ভারতীয় উপকূলরেখা',
        coastlinePara1: '৭,৫০০ কিলোমিটারেরও বেশি বিস্তৃত, ভারতীয় উপকূলরেখা একটি বৈচিত্র্যময় এবং গতিশীল বাস্তুতন্ত্র। পশ্চিমের পাথুরে তীর থেকে পূর্বের বালুকাময় সৈকত এবং ব-দ্বীপ পর্যন্ত, এটি বিভিন্ন ধরণের উদ্ভিদ এবং প্রাণীর আবাসস্থল।',
        faunaTitle: 'উপকূলীয় বন্যপ্রাণী',
        faunaPara1: 'উপকূলীয় অঞ্চলগুলি জীবনে ভরপুর। ওড়িশার উপকূলে অলিভ রিডলি কচ্ছপ খুঁজুন, আন্দামান দ্বীপপুঞ্জের রঙিন প্রবাল প্রাচীর আবিষ্কার করুন, বিভিন্ন প্রজাতির কাঁকড়া চিহ্নিত করুন এবং জলাভূমিতে পরিযায়ী পাখি দেখুন।',
        observationNameLabel: 'পর্যবেক্ষণের নাম (ঐচ্ছিক)',
        observationNamePlaceholder: 'যেমন, পাথরের উপর স্টারফিশ',
        saveObservation: 'পর্যবেক্ষণ সংরক্ষণ করুন',
        cancel: 'বাতিল করুন',
    },
    te: {
        appTitle: 'తీరప్రాంత పరిశీలకుడు',
        newObservation: 'కొత్త పరిశీలన',
        processingObservation: 'పరిశీలన ప్రాసెస్ చేయబడుతోంది...',
        welcomeTitle: 'భారతదేశ తీరాలను అన్వేషించండి',
        welcomeMessage: 'మీ తీరప్రాంత ఆవిష్కరణలను సంగ్రహించి, జియోట్యాగ్ చేయండి, శక్తివంతమైన సముద్ర జీవుల నుండి ప్రత్యేకమైన భౌగోళిక నిర్మాణాల వరకు.',
        coastlineTitle: 'మహోన్నత భారత తీరప్రాంతం',
        coastlinePara1: '7,500 కిలోమీటర్లకు పైగా విస్తరించి ఉన్న భారత తీరప్రాంతం ఒక విభిన్నమైన మరియు డైనమిక్ పర్యావరణ వ్యవస్థ. పశ్చిమాన రాతి తీరాల నుండి తూర్పున ఇసుక బీచ్‌లు మరియు డెల్టాల వరకు, ఇది విభిన్న రకాల వృక్షజాలం మరియు జంతుజాలానికి నిలయం.',
        faunaTitle: 'తీరప్రాంత వన్యప్రాణులు',
        faunaPara1: 'తీరప్రాంతాలు జీవంతో నిండి ఉన్నాయి. ఒడిశా తీరంలో ఆలివ్ రిడ్లీ తాబేళ్లను వెతకండి, అండమాన్ దీవులలో రంగురంగుల పగడపు దిబ్బలను కనుగొనండి, వివిధ రకాల పీతలను గుర్తించండి మరియు చిత్తడి నేలల వెంట వలస పక్షులను చూడండి.',
        observationNameLabel: 'పరిశీలన పేరు (ఐచ్ఛికం)',
        observationNamePlaceholder: 'ఉదా., రాళ్లపై స్టార్ ఫిష్',
        saveObservation: 'పరిశీలనను సేవ్ చేయండి',
        cancel: 'రద్దు చేయండి',
    },
};
