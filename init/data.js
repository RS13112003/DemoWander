
const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
        category: "Beach"
    },
    {
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
        },
        price: 1200,
        location: "New York City",
        country: "United States",
        category: "Iconic-Cities"
    },
    {
        title: "Mountain Retreat",
        description: "Unplug and unwind in this peaceful mountain cabin surrounded by nature.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
        },
        price: 1000,
        location: "Aspen",
        country: "United States",
        category: "Cabins"
    },
    {
        title: "Historic Villa in Tuscany",
        description: "Experience the charm of Tuscany in this beautifully restored villa.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
        },
        price: 2500,
        location: "Florence",
        country: "Italy",
        category: "Countryside"
    },
    {
        title: "Secluded Treehouse Getaway",
        description: "Live among the treetops in this unique treehouse retreat.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
        },
        price: 800,
        location: "Portland",
        country: "United States",
        category: "Treehouses"
    },
    {
        title: "Beachfront Paradise",
        description: "Step out of your door onto the sandy beach in this beachfront condo.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
        },
        price: 2000,
        location: "Cancun",
        country: "Mexico",
        category: "Beach"
    },
    {
        title: "Rustic Cabin by the Lake",
        description: "Spend your days fishing and kayaking on the serene lake.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
        },
        price: 900,
        location: "Lake Tahoe",
        country: "United States",
        category: "Lakefront"
    },
    {
        title: "Luxury Penthouse with City Views",
        description: "Indulge in luxury living with panoramic city views.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
        },
        price: 3500,
        location: "Los Angeles",
        country: "United States",
        category: "Iconic-Cities"
    },
    {
        title: "Ski-In/Ski-Out Chalet",
        description: "Hit the slopes right from your doorstep in this chalet.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
        },
        price: 3000,
        location: "Verbier",
        country: "Switzerland",
        category: "Arctic"
    },
    {
        title: "Safari Lodge in the Serengeti",
        description: "Experience the thrill of the wild in this comfortable safari lodge.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
        },
        price: 4000,
        location: "Serengeti National Park",
        country: "Tanzania",
        category: "Countryside"
    },
    {
        title: "Historic Canal House",
        description: "Stay in a piece of history in this canal house.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
        },
        price: 1800,
        location: "Amsterdam",
        country: "Netherlands",
        category: "Iconic-Cities"
    },
    {
        title: "Private Island Retreat",
        description: "Have an entire island to yourself for an unforgettable vacation.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
        },
        price: 10000,
        location: "Fiji",
        country: "Fiji",
        category: "Beach"
    },
    {
        title: "Charming Cottage in the Cotswolds",
        description: "Escape to the picturesque Cotswolds in this charming cottage.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60",
        },
        price: 1200,
        location: "Cotswolds",
        country: "United Kingdom",
        category: "Countryside"
    },
    {
        title: "Historic Brownstone in Boston",
        description: "Step back in time in this elegant historic brownstone.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60",
        },
        price: 2200,
        location: "Boston",
        country: "United States",
        category: "Iconic-Cities"
    },
    {
        title: "Beachfront Bungalow in Bali",
        description: "Relax on the sandy shores of Bali in this bungalow.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60",
        },
        price: 1800,
        location: "Bali",
        country: "Indonesia",
        category: "Beach"
    },
    {
        title: "Mountain View Cabin in Banff",
        description: "Enjoy breathtaking mountain views in Banff.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        location: "Banff",
        country: "Canada",
        category: "Cabins"
    },
    {
        title: "Art Deco Apartment in Miami",
        description: "Step into the glamour of the 1920s in Miami.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 1600,
        location: "Miami",
        country: "United States",
        category: "Iconic-Cities"
    },
    {
        title: "Tropical Villa in Phuket",
        description: "Escape to paradise in this luxurious villa.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60",
        },
        price: 3000,
        location: "Phuket",
        country: "Thailand",
        category: "Beach"
    },
    {
        title: "Historic Castle in Scotland",
        description: "Live like royalty in this historic castle.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60",
        },
        price: 4000,
        location: "Scottish Highlands",
        country: "United Kingdom",
        category: "Castle"
    },
    {
        title: "Desert Oasis in Dubai",
        description: "Experience luxury in the desert.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
        },
        price: 5000,
        location: "Dubai",
        country: "United Arab Emirates",
        category: "Others"
    },
    {
        title: "Lakeside Cabin in Switzerland",
        description: "Relax in a cozy wooden cabin surrounded by mountains and a crystal-clear lake.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
        },
        price: 3500,
        location: "Interlaken",
        country: "Switzerland",
        category: "Lakefront"
    }
];

module.exports = { data: sampleListings };
