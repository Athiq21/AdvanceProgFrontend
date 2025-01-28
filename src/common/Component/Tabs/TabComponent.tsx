// // // // import React, { ReactNode } from 'react';
// // // // import { Tabs, Tab, AppBar, useMediaQuery, useTheme } from '@mui/material';

// // // // interface TabItem {
// // // //   label: string;
// // // //   content: ReactNode;
// // // // }

// // // // interface CustomTabsProps {
// // // //   tabs: TabItem[];
// // // //   value: number;
// // // //   onChange: (event: React.SyntheticEvent, newValue: number) => void;
// // // // }

// // // // const TabComponent: React.FC<CustomTabsProps> = ({ tabs, value, onChange }) => {
// // // //   const theme = useTheme();
// // // //   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust this breakpoint as needed

// // // //   return (
// // // //     <>
// // // //       <AppBar
// // // //         position="static"
// // // //         sx={{
// // // //           marginTop:'1',
// // // //           backgroundColor: "#FAFAFA",
// // // //           borderRadius: 2,
// // // //           height: isMobile ? 60 : 90, // Adjust height based on screen size
// // // //         }}
// // // //       >
// // // //         <Tabs
// // // //           value={value}
// // // //           onChange={onChange}
// // // //           sx={{
// // // //             display: 'flex',
// // // //             justifyContent: 'center',
// // // //             width: '100%',
// // // //             padding: 0,
// // // //             flexDirection: isMobile ? 'column' : 'row', // Stack tabs vertically on mobile
// // // //             alignItems: isMobile ? 'center' : 'flex-start', // Center align on mobile
// // // //           }}
// // // //         >
// // // //           {tabs.map((tab, index) => (
// // // //             <Tab
// // // //               key={index}
// // // //               label={tab.label}
// // // //               sx={{
// // // //                 margin: isMobile ? '8px 0' : '0 200px', // Adjust margin based on screen size
// // // //                 marginTop: isMobile ? '10px' : '22px',
// // // //               }}
// // // //             />
// // // //           ))}
// // // //         </Tabs>
// // // //       </AppBar>

// // // //       {tabs.map((tab, index) => (
// // // //         <div
// // // //           key={index}
// // // //           role="tabpanel"
// // // //           hidden={value !== index}
// // // //           id={`tabpanel-${index}`}
// // // //           aria-labelledby={`tab-${index}`}
// // // //         >
// // // //           {value === index && <div>{tab.content}</div>}
// // // //         </div>
// // // //       ))}
// // // //     </>
// // // //   );
// // // // };

// // // // export default TabComponent;


// // // import React, { ReactNode } from 'react';
// // // import { Tabs, Tab, AppBar, useMediaQuery, useTheme } from '@mui/material';

// // // interface TabItem {
// // //   label: string;
// // //   content: ReactNode;
// // // }

// // // interface CustomTabsProps {
// // //   tabs: TabItem[];
// // //   value: number;
// // //   onChange: (event: React.SyntheticEvent, newValue: number) => void;
// // // }

// // // const TabComponent: React.FC<CustomTabsProps> = ({ tabs, value, onChange }) => {
// // //   const theme = useTheme();
// // //   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust this breakpoint as needed

// // //   return (
// // //     <>
// // //       <AppBar
// // //         position="static"
// // //         sx={{
// // //           marginTop:'1',
// // //           backgroundColor: "#FAFAFA",
// // //           borderRadius: 2,
// // //           marginLeft:-30,
// // //           width:'1200px',
// // //           height: isMobile ? 60 : 90, // Adjust height based on screen size
// // //         }}
// // //       >
// // //         <Tabs
// // //           value={value}
// // //           onChange={onChange}
// // //           sx={{
// // //             display: 'flex',
// // //             justifyContent: 'center',
// // //             width: '100%',
// // //             padding: 0,
// // //             flexDirection: isMobile ? 'column' : 'row', // Stack tabs vertically on mobile
// // //             alignItems: isMobile ? 'center' : 'flex-start', // Center align on mobile
// // //           }}
// // //         >
// // //           {tabs.map((tab, index) => (
// // //             <Tab
// // //               key={index}
// // //               label={tab.label}
// // //               sx={{
// // //                 margin: isMobile ? '8px 0' : '0 250px', // Adjust margin based on screen size
// // //                 marginTop: isMobile ? '10px' : '22px',
// // //               }}
// // //             />
// // //           ))}
// // //         </Tabs>
// // //       </AppBar>

// // //       {tabs.map((tab, index) => (
// // //         <div
// // //           key={index}
// // //           role="tabpanel"
// // //           hidden={value !== index}
// // //           id={`tabpanel-${index}`}
// // //           aria-labelledby={`tab-${index}`}
// // //         >
// // //           {value === index && <div>{tab.content}</div>}
// // //         </div>
// // //       ))}
// // //     </>
// // //   );
// // // };

// // // export default TabComponent;


// // import React, { ReactNode } from 'react';
// // import { Tabs, Tab, AppBar, useMediaQuery, useTheme ,Box} from '@mui/material';

// // interface TabItem {
// //   label: string;
// //   content: ReactNode;
// // }

// // interface CustomTabsProps {
// //   tabs: TabItem[];
// //   value: number;
// //   onChange: (event: React.SyntheticEvent, newValue: number) => void;
// // }

// // const TabComponent: React.FC<CustomTabsProps> = ({ tabs, value, onChange }) => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   return (
// //     <>
// //       <AppBar
// //         position="static"
// //         sx={{
// //           marginTop: 1,
// //           backgroundColor: '#FAFAFA',
// //           borderRadius: 2,
// //           width: isMobile ? '100%' : '80%',
// //           margin: isMobile ? '0 auto' : '20px auto',
// //           height: isMobile ? 60 : 90,
// //           boxShadow: isMobile ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
// //         }}
// //       >
// //         <Tabs
// //           value={value}
// //           onChange={onChange}
// //           sx={{
// //             display: 'flex',
// //             justifyContent: 'center',
// //             width: '100%',
// //             flexDirection: isMobile ? 'column' : 'row',
// //           }}
// //           variant={isMobile ? 'scrollable' : 'standard'}
// //         >
// //           {tabs.map((tab, index) => (
// //             <Tab
// //               key={index}
// //               label={tab.label}
// //               sx={{
// //                 margin: isMobile ? '8px 0' : '0 20px',
// //                 fontSize: isMobile ? '12px' : '16px',
// //               }}
// //             />
// //           ))}
// //         </Tabs>
// //       </AppBar>

// //       {tabs.map((tab, index) => (
// //         <div
// //           key={index}
// //           role="tabpanel"
// //           hidden={value !== index}
// //           id={`tabpanel-${index}`}
// //           aria-labelledby={`tab-${index}`}
// //         >
// //           {value === index && <Box p={2}>{tab.content}</Box>}
// //         </div>
// //       ))}
// //     </>
// //   );
// // };

// // export default TabComponent;

// import React, { ReactNode } from 'react';
// import { Tabs, Tab, AppBar, useMediaQuery, useTheme, Box } from '@mui/material';

// interface TabItem {
//   label: string;
//   content: ReactNode;
// }

// interface CustomTabsProps {
//   tabs: TabItem[];
//   value: number;
//   onChange: (event: React.SyntheticEvent, newValue: number) => void;
// }

// const TabComponent: React.FC<CustomTabsProps> = ({ tabs, value, onChange }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <>
//       <AppBar
//         position="static"
//         sx={{
//           marginTop: 1,
//           backgroundColor: '#FAFAFA',
//           borderRadius: 2,
//           width: isMobile ? '100%' : '80%',
//           margin: '0 auto',
//           height: isMobile ? 60 : 90,
//           boxShadow: isMobile ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//          <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//           }}
//         >
//           <Tabs
//             value={value}
//             onChange={onChange}
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//               flexDirection: isMobile ? 'column' : 'row',
//             }}
//             variant={isMobile ? 'scrollable' : 'standard'}
//           >
//             {tabs.map((tab, index) => (
//               <Tab
//                 key={index}
//                 label={tab.label}
//                 sx={{
//                   margin: isMobile ? '8px 0' : '0 20px',
//                   fontSize: isMobile ? '12px' : '16px',
//                 }}
//               />
//             ))}
//           </Tabs>
//         </Box>
//       </AppBar>

//       {tabs.map((tab, index) => (
//         <div
//           key={index}
//           role="tabpanel"
//           hidden={value !== index}
//           id={`tabpanel-${index}`}
//           aria-labelledby={`tab-${index}`}
//         >
//           {value === index && <Box p={2}>{tab.content}</Box>}
//         </div>
//       ))}
//     </>
//   );
// };

// export default TabComponent;

import React, { ReactNode } from 'react';
import { Tabs, Tab, AppBar, useMediaQuery, useTheme, Box } from '@mui/material';

interface TabItem {
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabComponent: React.FC<CustomTabsProps> = ({ tabs, value, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // For tablets

  return (
    <>
      <AppBar
        position="static"
        sx={{
          marginTop: 1,
          backgroundColor: '#FAFAFA',
          borderRadius: 2,
          width: '100%',  // Always take full width
          maxWidth: isMobile ? '100%' : isTablet ? '90%' : '80%',  // Adjust width based on device
          margin: '0 auto',  // Center it
          height: isMobile ? 60 : 90,
          boxShadow: isMobile ? 'none' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Tabs
            value={value}
            onChange={onChange}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexDirection: isMobile ? 'column' : 'row',
            }}
            variant={isMobile ? 'scrollable' : 'standard'}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                sx={{
                  margin: isMobile ? '8px 0' : '0 20px',
                  fontSize: isMobile ? '12px' : '16px',
                }}
              />
            ))}
          </Tabs>
        </Box>
      </AppBar>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {value === index && <Box p={2}>{tab.content}</Box>}
        </div>
      ))}
    </>
  );
};

export default TabComponent;
