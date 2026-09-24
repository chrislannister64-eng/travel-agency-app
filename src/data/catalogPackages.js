const destinations = [
  ['Accra', 'Ghana'], ['Marrakech', 'Morocco'], ['Cairo', 'Egypt'], ['Zanzibar', 'Tanzania'], ['Cape Town', 'South Africa'],
  ['Victoria', 'Seychelles'], ['Dubai', 'United Arab Emirates'], ['Santorini', 'Greece'], ['Rome', 'Italy'], ['Paris', 'France'],
  ['Barcelona', 'Spain'], ['Lisbon', 'Portugal'], ['Reykjavik', 'Iceland'], ['Oslo', 'Norway'], ['Copenhagen', 'Denmark'],
  ['Stockholm', 'Sweden'], ['Edinburgh', 'Scotland'], ['Dublin', 'Ireland'], ['Tokyo', 'Japan'], ['Ubud', 'Indonesia'],
  ['Sydney', 'Australia'], ['New York', 'United States'], ['Rio de Janeiro', 'Brazil'], ['Cusco', 'Peru'], ['Queenstown', 'New Zealand'],
  ['Banff', 'Canada'], ['Istanbul', 'Turkey'], ['Prague', 'Czech Republic'], ['Vienna', 'Austria'], ['Cape Verde', 'Cabo Verde'],
]

const experiences = [
  ['Dawn to Dusk', 'city escape', 4, 145000],
  ['The Local Edit', 'cultural escape', 5, 172000],
  ['Wild Horizons', 'nature adventure', 7, 238000],
  ['A Table for the World', 'food journey', 6, 210000],
]

export const catalogPackages = destinations.flatMap(([destination, country], destinationIndex) => (
  experiences.map(([experience, style, days, basePrice], experienceIndex) => ({
    id: `voyage-${destination.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${experienceIndex + 1}`,
    title: `${experience}: ${destination}`,
    destination,
    country,
    description: `Spend ${days} memorable days discovering ${destination} through a carefully paced ${style}. Enjoy trusted local recommendations, comfortable stays, and enough free time to make the journey your own. Your Voyage host will help you find the moments that make ${destination} special.`,
    price: basePrice + (destinationIndex * 85) + (experienceIndex * 120),
    currency: 'NGN',
    duration: `${days} days / ${days - 1} nights`,
    image: `https://picsum.photos/seed/voyage-${destinationIndex + 1}-${experienceIndex + 1}/1000/700`,
    status: 'active',
    isCatalogPackage: true,
  }))
))