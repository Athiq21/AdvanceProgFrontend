// src/components/NaviData.tsx
// src/NavBar/NavData.tsx

export interface NavItem {
  id:number;
  label: string;
  path: string;
  subLinks?: NavItem[];
}

const NavData: NavItem[] = [
  {  id: 1,label: "Home", path: "/" },

  { id:2,
    label: "Category",
    path: "/category",
    subLinks: [
      { id:1, label: "Electronic Items", path: "/category/electronic" },
      {id:2, label: "Vechicles", path: "/category/Vehicle" },
      { id:3,label: "Cakes", path: "/category/cakes" },
      { id:4,label: "Home & Garden", path: "/category/homeG" },
      { id:5,label: "Accesories", path: "/category/accs" },
      { id:6, label: "Others", path: "/category/others" },
    ]
  },
  { id: 3,label: "Travel", path: "/travel" },
 
  { id: 4,label: "Event", path: "/events" },

  

  { id: 5,
    label: "Post",
    path: "/post",
  },  
];

export default NavData;









// export const NavData= [
//       {
//         id: 1,
//         title: 'Home',
//         path: '/',
//       },
//       {
//         id: 2,
//         title: 'Category',
//         path: '/',
//         subMenuItem: [
//           { id: 1, name: 'Electronic Item', path: '/category/electronic-item' },
//           { id: 2, name: 'Vehicles', path: '/category/vehicles' },
//           { id: 3, name: 'Cakes', path: '/category/cakes' },
//           { id: 4, name: 'Home and Garden Items', path: '/category/home-and-garden-items' },
//           { id: 5, name: 'Accessories', path: '/category/accessories' },
//           { id: 6, name: 'Others', path: '/category/others' },
//         ],
//       },
//       {
//         id: 3,
//         title: 'Event',
//         path: '/pages/EventPage/Eventpage.tsx',
//       },
//       {
//         id: 4,
//         title: 'Travel',
//         path: '/travel',
//       },
//       {
//         id: 5,
//         title: 'Sale',
//         path: '/sale',
//       },
//       {
//         id: 6,
//         title: 'Post',
//         path: '/post',
//         subMenuItem: [
//           { id: 1, name: 'Post Item', path: '/' },
//           { id: 2, name: 'Post Memories', path: '/' },
//           { id: 3, name: 'Post Event', path: '/' },
          
//         ],
//       },
//     ];
    