import authBackgroundImage from "assets/images/auth_background.jpeg";

const componentStyleOverrides = ({isDarkMode, colors, theme}) => {
  const transition = theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  });

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButtonNavbarItem": {
            padding: "0.75rem 1rem",
            borderRadius: 0,
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.complex,
            }),
            justifyContent: "flex-start",
            "span": {
              fontWeight: theme.typography.fontWeightBold,
            },
            "&:hover": {
              backgroundColor: theme.palette.primary[100]
            },
            "&.linkActive": {
              backgroundColor: theme.palette.primary[200]
            }
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        color: colors.grey[900],
        root: {
          "&.MuiIconButtonHeaderActionButton": {
            borderRadius: "0.5rem",
            transition,
            "&:hover": {
              backgroundColor: colors.primary[200]
            }
          },
          "&.MuiIconButtonSearchInput": {
            backgroundColor: colors.grey[100],
            borderLeft: 'none',
            borderRadius: 0,
            borderTopRightRadius: "0.25rem",
            borderBottomRightRadius: "0.25rem",
            height: "100%",
            transition,
            "svg": {
              color: colors.grey[500],
              transition,
              "&:hover": {
                transform: "scale(1.1)"
              },
            }
          },
          "&.MuiIconButtonClearSearchInput": {
            position: "absolute", 
            right: 0, 
            top: "50%",
            transform: "translateY(-50%)",
            "&:hover": {
              backgroundColor: "transparent"
            },
            "svg": {
              fontSize: "1rem", 
              color: theme.palette.grey[700],
              transition,
              "&:hover": {
                fontSize: "1.1rem"
              }
            }
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.InputBaseSearchInput": {
            flexGrow: 1,
            "input": {
              padding: "0 2rem 0 1rem",
              backgroundColor: colors.grey[100],
              borderRight: 0,
              boxSizing: "inherit",
              height: "100%",
              borderRadius: 0,
              borderTopLeftRadius: "0.25rem",
              borderBottomLeftRadius: "0.25rem",
            }
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.ListItemDropdown": {
            padding: 0,
            cursor: "pointer",
            "&.ListItemDropdownSelected": {
              backgroundColor: colors.primary[50],
              "span": {
                color: colors.primary.main,
                fontWeight: theme.typography.fontWeightBold
              }
            },
            transition,
            "&:hover": {
              backgroundColor: colors.primary[100],
              "span": {
                color: colors.primary.main
              }
            },
            ".MuiListItemIcon-root": {
              minWidth: "inherit", 
              padding: "0 0.5rem",
              color: colors.primary.main,
            },
            ".MuiListItemButton-root": {
              paddingLeft: "0",
              backgroundColor: "transparent"
            }
          }
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          "&.BottomNavigationActions": {
            position: "absolute", 
            bottom: 0,
            width: "100%"
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "&.MuiDialogAuthDialog": {
            ".MuiDialog-paper": {
              maxHeight: "inherit",
              width: "calc(100% - 25px)",
              margin: 0,

              ".MuiDialogContent-root": {
                padding: 0,
                display: "grid",
                gridTemplateRows: "200px 1fr",
                [theme.breakpoints.up('md')]: {
                  gridTemplateRows: "inherit",
                  gridTemplateColumns: "1fr 1fr",
                },

                ".AuthImageContainer": {
                  backgroundImage: `url(${authBackgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "200px",
                  [theme.breakpoints.up('md')]: {
                    height: "600px",
                  },
                }
              }

            },
          }
        }
      }
    }
  };
}

export default componentStyleOverrides;
