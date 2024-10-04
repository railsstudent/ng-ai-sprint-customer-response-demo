import { NavigatorUserAgentBrand } from '../types/navigation-user-agent-brand.type';

function isNavigator(navigator: unknown): navigator is NavigatorUserAgentBrand {
    const brands = (navigator as NavigatorUserAgentBrand).userAgentData?.brands;
    return brands !== undefined && Array.isArray(brands);
 }
 
 // https://blog.logrocket.com/chrome-new-window-ai-api-vue-app/
 export function getChromVersion() {
    const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : 0;
 }
 
function getBrowserBrandInfo() {
    if (isNavigator(navigator)) {
       return navigator.userAgentData?.brands;
    }
    return [];
 }
 
export function isChromeBrowser() {
    if (isNavigator(navigator)) {
       const brands = navigator.userAgentData?.brands;
       if (brands) {
          return brands.some((brand) => brand.brand === 'Google Chrome');
       }
    }
 
    return getBrowserBrandInfo()?.some((info) => info.brand === 'Google Chrome');
}
 
export function getBrowserName(): string {
    return getBrowserBrandInfo()?.[0]?.brand || 'Unknown';
}
 