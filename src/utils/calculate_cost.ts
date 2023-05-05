const priceList = [
  {
    year: '2023',
    services: {
      internet: 39,
      tv: 49,
      tel: 29,
      decoder: 29,
      internet_tv: 79,
      internet_tel: 64,
    },
  },
  {
    year: '2024',
    services: {
      internet: 49,
      tv: 49,
      tel: 29,
      decoder: 29,
      internet_tv: 89,
      internet_tel: 64,
    },
  },
  {
    year: '2025',
    services: {
      internet: 59,
      tv: 59,
      tel: 29,
      decoder: 29,
      internet_tv: 99,
      internet_tel: 64,
    },
  },
];

const calculateCost = (
  servicesForSelectedYear: {
    year: string;
    internet: boolean;
    tv: boolean;
    tel: boolean;
    decoder: boolean;
  }[],
) => {
  let sum = 0;
  servicesForSelectedYear.forEach((service) => {
    const prices = priceList.find((price) => price.year === service.year);
    if (prices) {
      //sum all services that are currently selected
      if (service.internet) {
        sum += prices.services.internet;
      }
      if (service.tv) {
        sum += prices.services.tv;
      }
      if (service.tel) {
        sum += prices.services.tel;
      }
      if (service.decoder) {
        sum += prices.services.decoder;
      }

      const hasInternetTv = service.internet && service.tv;
      const hasInternetTel = service.internet && service.tel;
      const hasDecoder = service.decoder ? prices.services.decoder : 0;

      // Calculate the difference in price before and after promotions for various combinations of services
      const differenceForInternetTvDiscount =
        prices.services.internet +
        prices.services.tv -
        prices.services.internet_tv;

      const differenceForInternetTelDiscount =
        prices.services.internet +
        prices.services.tel -
        prices.services.internet_tel;

      // Check which promotion (TV or phone) yields a lower price
      const cheaperPromo =
        prices.services.tv + prices.services.internet_tel + hasDecoder <
        prices.services.internet_tv + prices.services.tel
          ? 'tel'
          : 'tv';

      // Apply promotions if the selected services match the criteria
      if (hasInternetTv && service.tel) {
        cheaperPromo === 'tv'
          ? (sum -= differenceForInternetTvDiscount + hasDecoder)
          : (sum -= differenceForInternetTelDiscount);
      } else {
        if (hasInternetTv) {
          sum -= differenceForInternetTvDiscount + hasDecoder;
        }

        if (hasInternetTel) {
          sum -= differenceForInternetTelDiscount;
        }
      }
    }
  });
  return sum;
};

export { calculateCost };
