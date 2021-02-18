const clothes = {
    umbrella: {
        name: 'umbrella',
        icon: require('./assets/clothes/umbrella.png')
    }, 
    rainboots: {
        name: 'rainboots',
        icon: require('./assets/clothes/rainboots.png')
    }, 
    raincoat: {
        name: 'raincoat',
        icon: require('./assets/clothes/raincoat.png')
    }, 
    sunglasses: {
        name: 'sunglasses',
        icon: require('./assets/clothes/sunglasses.png')
    }, 
    thickjacket: {
        name: 'thick jacket',
        icon: require('./assets/clothes/thickjacket.png')
    }, 
    mediumjacket: {
        name: 'medium jacket',
        icon: require('./assets/clothes/mediumjacket.png')
    }, 
    lightjacket: {
        name: 'light jacket',
        icon: require('./assets/clothes/lightjacket.png')
    }, 
    sweater: {
        name: 'sweater',
        icon: require('./assets/clothes/sweater.png')
    }, 
    longpants: {
        name: 'long pants',
        icon: require('./assets/clothes/longpants.png')
    }, 
    shorts: {
        name: 'shorts',
        icon: require('./assets/clothes/shorts.png')
    },
    skirt: {
        name: 'skirt',
        icon: require('./assets/clothes/skirt.png')
    },
    gloves: {
        name: 'gloves',
        icon: require('./assets/clothes/gloves.png')
    },
    hat: {
        name: 'hat',
        icon: require('./assets/clothes/hat.png')
    }, 
    tshirt: {
        name: 't-shirt',
        icon: require('./assets/clothes/tshirt.png')
    },
    sleevelessshirt: {
        name: 'sleeveless shirt',
        icon: require('./assets/clothes/sleeveless.png')
    }, 
    sandals: {
        name: 'sandals',
        icon: require('./assets/clothes/sandals.png')
    }, 
    dress: {
        name: 'dress',
        icon: require('./assets/clothes/dress.png')
    }, 
    scarf: {
        name: 'scarf',
        icon: require('./assets/clothes/scarf.png')
    },
    snowboots: {
        name: 'snow boots',
        icon: require('./assets/clothes/rainboots.png')
    }
};

const PRECIP = {
    snow: [clothes.snowboots],
    rain: [clothes.raincoat, clothes.rainboots, clothes.umbrella]
}

const TEMP = {
    frigid: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf, clothes.gloves], // 20-34
    freezing: [clothes.sweater, clothes.thickjacket, clothes.longpants, clothes.hat, clothes.scarf], // 35-42
    cold: [clothes.sweater, clothes.mediumjacket, clothes.longpants, clothes.scarf], // 43-49
    chilly: [clothes.sweater, clothes.mediumjacket, clothes.longpants], // 50-59
    mild: [clothes.tshirt, clothes.lightjacket, clothes.longpants],  // 60-69
    comfortable: [clothes.tshirt, clothes.longpants, clothes.shorts], // 70-72
    warm: [clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals], // 73-79
    hot: [clothes.sleevelessshirt, clothes.tshirt, clothes.shorts, clothes.skirt, clothes.dress, clothes.sandals] // 80+
}
  
export const getWearables = (day) => {
    if (!day) return [];
    const { avg, precip, precipType, summary } = day;
    let wearables = [];

    if (avg < 35) wearables = wearables.concat(TEMP.frigid);
    else if (avg < 43) wearables = wearables.concat(TEMP.freezing)
    else if (avg < 50) wearables = wearables.concat(TEMP.cold)
    else if (avg < 60) wearables = wearables.concat(TEMP.chilly)
    else if (avg < 70) wearables = wearables.concat(TEMP.mild)
    else if (avg < 73) wearables = wearables.concat(TEMP.comfortable)
    else if (avg < 80) wearables = wearables.concat(TEMP.warm)
    else if (avg >= 80) wearables = wearables.concat(TEMP.hot)

    
    if (precip > 20) wearables = wearables.concat(PRECIP[precipType])

    if (precip === 0 && summary.includes('sun')) wearables.push(clothes.sunglasses);

    return wearables;
}