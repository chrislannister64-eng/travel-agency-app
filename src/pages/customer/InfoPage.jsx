import { useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Alert, Box, Button, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Footer from '../../components/Footer'

const pageContent = {
  'about-us': {
    eyebrow: 'ABOUT VOYAGE', title: 'Travel with a little more meaning.', intro: 'Voyage creates thoughtful journeys for people who want to see more, feel more, and come home with stories worth telling.',
    sections: [['The idea behind Voyage', 'Voyage began in 2021 after a group of friends kept having the same conversation: travel should feel exciting, but planning it should not feel exhausting. They imagined a travel company that could combine local knowledge with the calm, clear guidance of a trusted friend.'], ['Why we started', 'Too many travellers were choosing between rigid group tours and the pressure of organising everything alone. We created Voyage to offer a third way: carefully planned journeys with enough structure to feel easy and enough freedom to feel like your own.'], ['Our approach', 'We pair carefully chosen places with practical planning, local insight, and the freedom to enjoy each day at your own pace. Every itinerary begins with the question, “What do we want this journey to feel like?”'], ['What you can expect', 'Clear information, trusted partners, comfortable stays, and a real person to help whenever you need us. We would rather promise a thoughtful experience than fill a page with things you do not need.'], ['The Voyage promise', 'We will be honest about what a trip includes, help you make informed choices, and stay available when the unexpected happens. Your time, money, and trust deserve care.'], ['Looking ahead', 'Voyage is growing one meaningful journey at a time. Our ambition is to help more people travel with curiosity while building stronger relationships with the local people and places they visit.']],
  },
  'our-story': {
    eyebrow: 'THE VOYAGE STORY', title: 'Travel should broaden horizons, not complicate them.', intro: 'Voyage was founded on a simple conviction: the best journeys make the world feel bigger while making the process of getting there feel beautifully clear.',
    sections: [
      ['Where the idea began', 'The idea for Voyage took shape when a group of lifelong explorers and travel industry veterans noticed a growing contradiction. Travel was becoming faster and more connected, yet finding an authentic, well-crafted journey had never felt more frustrating.'],
      ['A better way forward', 'Travellers were wading through overwhelming search engines, fragmented booking systems, and generic itineraries that lacked depth, care, and transparency. We imagined a different kind of travel company: one that could bridge effortless discovery with deeply enriching experiences.'],
      ['Redefining the modern journey', 'Voyage began as a collective of passionate curators, local experts, and travel strategists dedicated to designing meaningful journeys across the globe. From peaceful beach retreats and cultural city escapes to wilderness safaris and high-altitude treks, we set out to create experiences for every style of exploration.'],
      ['More than a booking', 'We never wanted travel to feel like a series of transaction points. Voyage was built as an end-to-end experience, where every step, from the first spark of inspiration to the moment you return home, feels seamless, intuitive, and inspiring.'],
      ['Innovation meets inspiration', 'As our network grew, we brought modern digital tools into the experience. Curated travel intelligence, transparent pricing, real-time filtering, and secure booking technology help people explore with confidence while keeping the human judgement that makes a journey feel personal.'],
      ['Who we serve', 'Today, Voyage welcomes solo travellers, families, groups, dreamers, adventurers, and holidaymakers from all walks of life. Some are looking for a quiet reset; others want a once-in-a-lifetime expedition. Every traveller deserves a journey that feels made for them.'],
      ['Our promise today', 'We remain committed to eliminating the friction of planning so you can focus on the beauty of the journey. We will keep listening, keep learning from the places we visit, and keep making travel feel more possible for more people.'],
    ],
    action: { label: 'Start your journey', to: '/packages' },
  },
  'our-team': {
    eyebrow: 'THE VOYAGE TEAM', title: 'People who love the way travel changes you.', intro: 'Our destination specialists, trip designers, and support team bring local knowledge and genuine curiosity to every itinerary.',
    sections: [['Here to help', 'From your first question to the moment you return home, our team is available to make your trip feel simple and personal.'], ['Made for you', 'Tell us what inspires you, and we will help shape a journey around your interests, pace, and budget.'], ['People behind the planning', 'Our team brings together destination researchers, customer hosts, booking specialists, and problem-solvers who care about the details travellers remember.'], ['A human answer', 'When you contact Voyage, you are speaking with someone who will listen first and recommend second. We do not believe every traveller needs the same itinerary.']],
  },
  'why-book-with-us': {
    eyebrow: 'WHY VOYAGE', title: 'Good travel planning should feel effortless.', intro: 'We handle the details so you can stay present for the places, people, and moments that make a trip unforgettable.',
    sections: [['Curated, not crowded', 'Our packages focus on worthwhile experiences rather than ticking every box.'], ['Support that stays with you', 'You get clear guidance before departure and responsive help while you are away.'], ['Clear pricing', 'We explain what is included before you commit, so you can compare options confidently and plan your budget without surprises.'], ['Flexible thinking', 'Plans sometimes change. We help you understand your options and find practical solutions when dates, preferences, or circumstances move.'], ['Local perspective', 'We look beyond the obvious highlights to find experiences that help you understand the character of a destination.'], ['A better starting point', 'You do not need to have everything figured out. Start with an idea, a feeling, or a date, and we can work from there.']],
  },
  reviews: {
    eyebrow: 'TRAVELLER STORIES', title: 'See where other travellers have been.', intro: 'Read honest stories from people who have explored with Voyage and discover the journeys that might inspire your own.',
    sections: [['What travellers say', 'Our guests value the thoughtful planning, friendly support, and small details that make their trips feel easy.'], ['A shared perspective', 'The most useful reviews mention the moments that cannot be captured in a brochure: a helpful guide, a smooth arrival, or a day that felt perfectly unhurried.'], ['Ready to explore?', 'Browse our latest packages and start planning your next story.'], ['Share your experience', 'If you have travelled with Voyage, we would love to hear what stayed with you and what we could make even better.']], action: { label: 'Browse packages', to: '/packages' },
  },
  sustainability: {
    eyebrow: 'TRAVEL WITH CARE', title: 'Go further. Leave a lighter footprint.', intro: 'We believe seeing the world comes with a responsibility to respect its communities, cultures, and landscapes.',
    sections: [['Better choices', 'We work with local partners and encourage longer stays, meaningful experiences, and responsible travel habits.'], ['Your part in the journey', 'Choose local businesses, respect the places you visit, and travel with curiosity and care.'], ['Local first', 'Working with local guides, hosts, drivers, and makers helps more of your travel spend remain in the communities that welcome you.'], ['Travel at a thoughtful pace', 'Longer stays and fewer rushed stops can create richer experiences while reducing the pressure of constant movement.'], ['Small decisions matter', 'Carry reusable essentials, follow local guidance, avoid disturbing wildlife, and leave natural places as you found them.']],
  },
  'website-terms': {
    eyebrow: 'LEGAL', title: 'Website terms', intro: 'These terms explain how to use the Voyage Travels website and the information shared through it.',
    sections: [['Using this website', 'The content on this website is provided for general travel information. Please confirm availability, pricing, and booking details before making plans.'], ['Bookings and availability', 'A package shown online is not confirmed until we have received the required information and sent you a booking confirmation. Prices and availability may change.'], ['Website content', 'We work to keep descriptions, images, and travel information accurate, but destinations and services can change. Please ask us about anything important to your plans.'], ['Questions', 'For clarification about these terms, please contact our team.']],
  },
  'booking-terms': {
    eyebrow: 'BOOKING SUPPORT', title: 'Booking terms', intro: 'A clear booking is the beginning of a relaxed journey. Here is what to know before confirming your trip.',
    sections: [['Before you book', 'Review the itinerary, inclusions, exclusions, payment schedule, and cancellation conditions for your chosen package.'], ['Payment', 'Your booking confirmation will explain the deposit or full payment required and the date by which any remaining balance is due.'], ['Changes and cancellations', 'Tell us as soon as possible if your plans change. The options available depend on the package, supplier rules, and how close you are to departure.'], ['After confirmation', 'You will receive your booking details and travel instructions. Keep these documents accessible throughout your journey.']],
  },
  'travel-updates': {
    eyebrow: 'TRAVEL UPDATES', title: 'Useful information for the road ahead.', intro: 'Find practical guidance to help you prepare for a smooth and confident departure.',
    sections: [['Before departure', 'Check your passport validity, entry requirements, travel insurance, health guidance, and local transport arrangements.'], ['Pack for the place', 'Look beyond the forecast. Consider footwear, layers, medication, adapters, and anything that will help you stay comfortable during long days out.'], ['Keep details handy', 'Save your booking documents offline, share your itinerary with someone at home, and keep emergency contacts accessible.'], ['On the journey', 'Contact us if your plans change or you need assistance. A quick message early is usually easier to solve than a last-minute surprise.']],
  },
  'privacy-policy': {
    eyebrow: 'YOUR PRIVACY', title: 'Privacy policy', intro: 'We collect and use information to provide better travel services, communicate with you, and manage your bookings.',
    sections: [['Information we use', 'This may include contact details, booking information, and messages you choose to send us.'], ['Why we use it', 'We use information to respond to enquiries, process bookings, provide support, improve our services, and keep our records accurate.'], ['How we protect it', 'We take reasonable technical and organisational steps to protect personal information and limit access to people who need it for their work.'], ['Your choices', 'You can ask what information we hold, request corrections, or contact us with privacy questions at any time.']],
  },
  'cookie-policy': {
    eyebrow: 'WEBSITE SETTINGS', title: 'Cookie policy', intro: 'Cookies help Voyage remember preferences, understand how the website is used, and improve your browsing experience.',
    sections: [['Your control', 'You can manage cookies through your browser settings. Disabling some cookies may affect parts of the site.'], ['Essential cookies', 'Some cookies help the website remember settings, keep forms working, and support secure areas. These are needed for core functionality.'], ['Helpful measurement', 'Some information helps us understand which pages are useful and where the experience could be clearer.'], ['Why they matter', 'We use only the information needed to keep the website useful, reliable, and secure.']],
  },
  sitemap: {
    eyebrow: 'EXPLORE VOYAGE', title: 'Sitemap', intro: 'Find your way around Voyage Travels and jump straight to the information you need.',
    sections: [['Plan a trip', 'Explore destinations, browse packages, and review your bookings from the main navigation.'], ['Learn about Voyage', 'Read our story, meet the thinking behind our trips, and discover why travellers choose us.'], ['Manage your journey', 'Sign in to view your bookings, or contact the team if you need help with a reservation.'], ['Need help?', 'Our contact page is the fastest way to reach the Voyage team.']], action: { label: 'Explore destinations', to: '/destinations' },
  },
  'travel-agencies': {
    eyebrow: 'TRAVEL PARTNERS', title: 'Work with Voyage.', intro: 'We welcome travel agencies looking for thoughtful itineraries and a dependable partner for their clients.',
    sections: [['Partnership support', 'Talk to us about package information, group travel, commissions, and creating a smooth experience for your customers.'], ['Useful resources', 'We can provide package information, destination context, booking guidance, and practical details to help you advise your clients.'], ['Built for trust', 'A strong agency partnership depends on clear communication, reliable follow-through, and a shared commitment to the traveller.'], ['Start a conversation', 'Send us your agency details and what you are looking to arrange.']], action: { label: 'Contact our team', to: '/contact' },
  },
  'email-us': {
    eyebrow: 'CONTACT VOYAGE', title: 'Send us an email.', intro: 'Have a question about a destination, package, or booking? Our team will point you in the right direction.',
    sections: [['Email', 'hello@voyagetravels.com'], ['What to include', 'Include your travel dates, preferred destination, group size, and the kind of experience you are looking for.'], ['Response time', 'We aim to respond within one business day. Include your travel dates and destination so we can help faster.']], action: { label: 'Open contact form', to: '/contact' },
  },
  'gift-voucher': {
    eyebrow: 'GIVE THE GIFT OF TRAVEL', title: 'A journey they will remember.', intro: 'A Voyage gift voucher gives someone the freedom to choose a place, a pace, and a story of their own.',
    sections: [['How it works', 'Contact us with the recipient details and the amount you would like to gift. We will help you arrange the rest.'], ['Made personal', 'Add a message, choose a value, and let the recipient decide when and where they would like to travel.'], ['A thoughtful present', 'Vouchers are ideal for birthdays, milestones, and anyone who would rather collect memories than things.']], action: { label: 'Ask about vouchers', to: '/contact' },
  },
  'call-us': {
    eyebrow: 'TALK TO A TRAVEL EXPERT', title: 'Sometimes a conversation is best.', intro: 'Our team is happy to talk through destinations, packages, and the details that matter to your trip.',
    sections: [['Phone', '+233 24 000 0000'], ['Best for', 'Call us when you want to compare destinations, talk through a special request, or get quick guidance before booking.'], ['Hours', 'Monday to Friday, 8:00 AM to 5:00 PM']], action: { label: 'Send a message instead', to: '/contact' },
  },
  'live-chat': {
    eyebrow: 'LIVE CHAT', title: 'Quick answers for your next adventure.', intro: 'Chat with a Voyage travel expert about availability, destinations, and what to expect on the road.',
    sections: [['Chat with us', 'Use the chat button when it is available, or send a message through our contact form and we will get back to you.'], ['Quick questions welcome', 'Ask about package availability, what is included, destination ideas, or which journey might suit your travel style.'], ['Helpful details', 'Share your preferred destination, dates, group size, and budget for a more useful answer.']], action: { label: 'Start a conversation', to: '/contact' },
  },
  careers: {
    eyebrow: 'JOIN VOYAGE', title: 'Build better journeys with us.', intro: 'We are always interested in meeting thoughtful people who care about hospitality, places, and the details that make travel special.',
    sections: [['What we value', 'Curiosity, kindness, clear communication, and a willingness to keep learning.'], ['How we work', 'We share ideas openly, take ownership of details, and remember that a small act of care can change a traveller’s whole day.'], ['What we look for', 'Experience in travel, hospitality, customer service, content, or operations is valuable, but a thoughtful attitude matters just as much.'], ['Get in touch', 'Send us a note about your experience and the kind of work you would love to do with Voyage.']], action: { label: 'Contact our team', to: '/contact' },
  },
  'media-centre': {
    eyebrow: 'MEDIA CENTRE', title: 'Stories, images, and travel insight.', intro: 'For press enquiries, destination stories, and Voyage brand information, our team is ready to help.',
    sections: [['Media enquiries', 'Contact us with your deadline, publication, and the information or images you need.'], ['Available information', 'We can help with Voyage background, destination context, itinerary details, interview requests, and approved brand assets.'], ['Our perspective', 'We believe travel stories should make places feel more connected, considered, and inviting.'], ['For a quick response', 'Include your publication, audience, deadline, and the exact subject you are covering when you get in touch.']], action: { label: 'Contact media team', to: '/contact' },
  },
}
  const aboutNavigation = [
    ['About Voyage', 'about-us'],
    ['Our mission', 'why-book-with-us'],
    ['Our guiding principles', 'sustainability'],
    ['Meet our people', 'our-team'],
    ['Our story', 'our-story'],
    ['Why we travel', 'reviews'],
  ]

  const teamMembers = [
    { name: 'Amara Mensah', role: 'Travel Experience Manager', email: 'amara@voyagetravels.com', summary: 'Helps travellers turn broad ideas into clear, exciting trip plans.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85' },
    { name: 'Kwame Owusu', role: 'Destination Specialist', email: 'kwame@voyagetravels.com', summary: 'Shares local insight and matches people with places they will love.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85' },
    { name: 'Nia Adjei', role: 'Small Groups Manager', email: 'nia@voyagetravels.com', summary: 'Plans relaxed group journeys where every traveller feels included.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85' },
    { name: 'Daniel Mensah', role: 'Tour Operations Manager', email: 'daniel@voyagetravels.com', summary: 'Keeps the moving parts of every itinerary running smoothly.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85' },
    { name: 'Esi Boateng', role: 'Customer Care Specialist', email: 'esi@voyagetravels.com', summary: 'Answers questions and makes sure every guest feels looked after.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85' },
    { name: 'Kofi Asante', role: 'Partnerships Manager', email: 'kofi@voyagetravels.com', summary: 'Builds trusted relationships with local hosts and travel partners.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85' },
    { name: 'Maya Addo', role: 'Journey Designer', email: 'maya@voyagetravels.com', summary: 'Shapes day-by-day experiences around each traveller\'s pace and interests.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=85' },
    { name: 'Jon Bell', role: 'Travel Support Lead', email: 'jon@voyagetravels.com', summary: 'Provides practical help before departure and while guests are away.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=85' },
    { name: 'Lina Clarke', role: 'Marketing and Stories Lead', email: 'lina@voyagetravels.com', summary: 'Tells the stories behind our destinations and the people who visit them.', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=85' },
    { name: 'Noah Williams', role: 'Finance and Bookings Lead', email: 'noah@voyagetravels.com', summary: 'Keeps payments, booking records, and travel documents accurate and clear.', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=500&q=85' },
    { name: 'Aisha Karim', role: 'Responsible Travel Advisor', email: 'aisha@voyagetravels.com', summary: 'Helps us make thoughtful choices for communities and the places we visit.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=85' },
    { name: 'Leo Grant', role: 'Product and Technology Lead', email: 'leo@voyagetravels.com', summary: 'Builds the tools that make discovering and booking travel feel simple.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=85' },
  ]

  const additionalTeamMembers = [
    ['Sofia Miller', 'Iceland Destination Expert'], ['Ethan Brooks', 'Northern Europe Specialist'], ['Ava Richardson', 'Guest Experience Host'], ['Liam Cooper', 'Adventure Travel Planner'], ['Mia Turner', 'Family Travel Advisor'],
    ['Oliver Ward', 'Transport Coordinator'], ['Isla Morgan', 'Accommodation Specialist'], ['James Carter', 'Custom Itinerary Designer'], ['Ella Hughes', 'Travel Consultant'], ['Henry Foster', 'Group Travel Advisor'],
    ['Grace Bennett', 'Customer Success Manager'], ['Lucas Hayes', 'Destination Researcher'], ['Chloe Parker', 'Booking Specialist'], ['Jack Mitchell', 'Operations Coordinator'], ['Lily Adams', 'Travel Content Editor'],
    ['William Scott', 'Business Development Lead'], ['Freya Collins', 'Luxury Travel Advisor'], ['Thomas Evans', 'Flight and Rail Planner'], ['Evie Stewart', 'Guest Relations Manager'], ['George Morris', 'Supplier Relations Lead'],
    ['Poppy Rogers', 'Travel Consultant'], ['Charlie Cook', 'Trip Logistics Specialist'], ['Isabella Murphy', 'Cultural Experiences Advisor'], ['Harry Bailey', 'Outdoor Journeys Planner'], ['Ruby Bell', 'Digital Content Specialist'],
    ['Arthur Cooper', 'Finance Coordinator'], ['Emily Richardson', 'Visa and Documentation Advisor'], ['Oscar Cox', 'Travel Safety Coordinator'], ['Sophie Howard', 'Wellness Travel Advisor'], ['Archie Ward', 'Destination Photographer'],
    ['Florence Gray', 'Sustainability Coordinator'], ['Freddie James', 'Product Coordinator'], ['Daisy Watson', 'Guest Communications Lead'], ['Theo Brooks', 'Itinerary Quality Manager'], ['Matilda Kelly', 'Travel Partnerships Advisor'],
    ['Henry Price', 'Regional Operations Lead'], ['Esme Jenkins', 'Customer Care Advisor'], ['Alfie Murray', 'Experience Curator'], ['Penny Dixon', 'Booking Support Specialist'], ['Max Graham', 'Travel Technology Specialist'],
    ['Willow Hamilton', 'Community Partnerships Lead'], ['Archie Marshall', 'Group Tour Coordinator'], ['Ivy Owen', 'Travel Planning Advisor'], ['Noah Reynolds', 'Supplier Experience Manager'], ['Elsie Fisher', 'Journey Support Specialist'],
    ['Jude Ellis', 'Destination Content Writer'], ['Maisie Harrison', 'Responsible Travel Advisor'], ['Finn Gibson', 'Guest Services Coordinator'], ['Rose Mason', 'Trip Change Specialist'], ['Sam Webb', 'Travel Operations Advisor'],
  ].map(([name, role], index) => ({
    name,
    role,
    email: `${name.toLowerCase().replace(' ', '.')}@voyagetravels.com`,
    summary: `Works across the Voyage team to make every ${role.toLowerCase().replace(' advisor', '').replace(' specialist', '')} experience feel clear, welcoming, and memorable.`,
    image: `https://i.pravatar.cc/500?img=${index + 13}`,
  }))

  const allTeamMembers = [...teamMembers, ...additionalTeamMembers]

export default function InfoPage() {
  const { slug } = useParams()
  const page = pageContent[slug] || pageContent['about-us']
    const isAbout = slug === 'about-us'
  const isTeam = slug === 'our-team'
  const [showAllTeam, setShowAllTeam] = useState(false)

  return (
    <>
        <Container maxWidth={isAbout || isTeam ? 'xl' : 'lg'} sx={{ py: { xs: 4, md: isAbout ? 0 : 10 } }}>
          {isAbout && (
            <Stack direction="row" spacing={{ xs: 2, md: 3 }} sx={{ py: 1.5, overflowX: 'auto', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(23, 42, 42, 0.12)' }}>
              {aboutNavigation.map(([label, destination], index) => (
                <Button
                  key={label}
                  component={RouterLink}
                  to={`/info/${destination}`}
                  size="small"
                  sx={{ flexShrink: 0, borderRadius: 0, color: 'text.secondary', px: 0.5, borderBottom: index === 0 ? '2px solid' : '2px solid transparent', borderColor: index === 0 ? 'primary.main' : 'transparent' }}
                >
                  {label}
                </Button>
              ))}
            </Stack>
          )}

          {isTeam ? (
            <Box sx={{ py: { xs: 7, md: 9 } }}>
              <Typography variant="h1" align="center" sx={{ color: 'primary.dark', fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1.05, mb: 3 }}>
                Meet our people
              </Typography>
              <Typography align="center" color="text.secondary" sx={{ maxWidth: 850, mx: 'auto', fontFamily: 'Georgia, serif', fontSize: { xs: '1.2rem', md: '1.45rem' }, lineHeight: 1.5, mb: { xs: 6, md: 8 } }}>
                We are a close-knit team of travel experts who know the destinations we recommend and care about the details that make a journey feel personal. Wherever you go, we are here for you.
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>Voyage travel team</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, gap: 2.5 }}>
                {allTeamMembers.slice(0, showAllTeam ? allTeamMembers.length : 10).map((member) => (
                  <Paper key={member.email} elevation={0} sx={{ overflow: 'hidden', bgcolor: '#FFF9F0', border: '1px solid #EEDFCB', borderRadius: 2 }}>
                    <Box sx={{ height: { xs: 250, md: 280 }, bgcolor: '#E9E2DA' }}>
                      <Box component="img" src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontSize: '1.05rem', mb: 0.5 }}>{member.name}</Typography>
                      <Typography color="primary.main" fontWeight={600} sx={{ fontSize: '0.9rem', mb: 0.75 }}>{member.role}</Typography>
                      <Typography color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.55, mb: 1.25 }}>{member.summary}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>{member.email}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
              <Button variant="contained" onClick={() => setShowAllTeam((current) => !current)} sx={{ display: 'flex', mx: 'auto', mt: 4 }}>
                {showAllTeam ? 'Show fewer' : 'Show more'}
              </Button>
            </Box>
          ) : isAbout ? (
            <Box sx={{ py: { xs: 7, md: 9 } }}>
              <Typography variant="h1" align="center" sx={{ color: 'primary.dark', fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1.05, mb: 3 }}>
                Your local travel experts with a world to share
              </Typography>
              <Typography align="center" color="text.secondary" sx={{ maxWidth: 850, mx: 'auto', fontFamily: 'Georgia, serif', fontSize: { xs: '1.2rem', md: '1.45rem' }, lineHeight: 1.5, mb: { xs: 6, md: 8 } }}>
                We are Voyage Travels. Curious people who plan thoughtful journeys with personal care, local insight, and the kind of details you only get from truly knowing a place. We have been helping travellers find their way since 2021.
              </Typography>
              <Paper elevation={0} sx={{ overflow: 'hidden', bgcolor: '#FFF9F0', border: '1px solid #EEDFCB', borderRadius: 2 }}>
                <Grid container>
                  <Grid item xs={12} md={7}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                      <Typography variant="h4" sx={{ mb: 3 }}>There is a story behind every journey.</Typography>
                      {page.sections.map(([title, text]) => (
                        <Box key={title} sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ mb: 0.5 }}>{title}</Typography>
                          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{text}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box component="img" src="/images/dubai.jpg" alt="A destination waiting to be explored" sx={{ width: '100%', height: { xs: 280, md: '100%' }, minHeight: 560, objectFit: 'cover', display: 'block' }} />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          ) : (
            <>
              <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.16em', fontWeight: 700 }}>{page.eyebrow}</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.7rem' }, lineHeight: 1, mt: 1.5, mb: 2 }}>{page.title}</Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, fontWeight: 400, lineHeight: 1.6, mb: 6 }}>{page.intro}</Typography>
              <Paper elevation={0} sx={{ bgcolor: '#FFF9F0', border: '1px solid #EEDFCB', borderRadius: 2, p: { xs: 3, md: 5 } }}>
                <Typography variant="h4" sx={{ mb: 1 }}>Everything you need to know</Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7, mb: 3 }}>
                  Take your time with the details below. We have gathered the practical information, context, and next steps that make planning with Voyage feel clear.
                </Typography>
                <Stack divider={<Divider flexItem sx={{ borderColor: '#EEDFCB' }} />}>
                  {page.sections.map(([title, text], index) => (
                    <Box key={title} sx={{ py: { xs: 2.5, md: 3 } }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }}>
                        <Typography color="secondary.main" sx={{ minWidth: 34, fontWeight: 700 }}>0{index + 1}</Typography>
                        <Box>
                          <Typography variant="h5" sx={{ mb: 0.75 }}>{title}</Typography>
                          <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.75 }}>{text}</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
                <Box sx={{ mt: 3, p: { xs: 2.5, md: 3 }, bgcolor: 'rgba(23, 107, 103, 0.08)', borderLeft: '4px solid', borderColor: 'primary.main' }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>A useful next step</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Keep this page handy while you plan. When you are ready, our travel experts can answer questions, explain your options, and help turn an idea into a journey that fits.
                  </Typography>
                </Box>
              </Paper>
            </>
          )}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
          <Button component={RouterLink} to={page.action?.to || '/contact'} variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
            {page.action?.label || 'Talk to our team'}
          </Button>
          <Button component={RouterLink} to="/packages" variant="outlined" size="large">Browse packages</Button>
        </Stack>
        {!page.action && <Alert severity="info" sx={{ mt: 4 }}>Need a little more help? Our travel experts can answer questions about your plans.</Alert>}
      </Container>
      <Footer />
    </>
  )
}