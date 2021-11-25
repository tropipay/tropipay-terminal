export const track = (event, payload) => {
    const data = payload ? payload : {};
    if(window.gtag){
        window.gtag('event', event, data);
    }
};

export const track_adw_conversion_signup = () => {
    const adwId = 'AW-978038876'
    const adwEvent = 'i5FlCLf50bcBENzgrtID'
    if (window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': `${adwId}/${adwEvent}`
        });
    }
}