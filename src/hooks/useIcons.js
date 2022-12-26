import { useCallback } from 'react';
import * as icons from '@mui/icons-material';
import stringSimilarity from 'string-similarity';

function useIcons() {
  const getIcon = useCallback((iconName) => {
    const matches = stringSimilarity.findBestMatch(iconName, Object.keys(icons));
    return icons[matches.bestMatch.target];
  },[]);

  return { getIcon }
}

export default useIcons