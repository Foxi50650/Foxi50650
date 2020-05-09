let rollConfig = {
  type: 'carousel',
  startAt: 0,
  perView: 2,
  rewind: false,
  hoverpause: true,
  autoplay: 2500,
  breakpoints: {
    1024: {
      perView: 2,
    },
    800: {
      perView: 1,
    },
    509: {
      perView: 1,
    },
  },
  gap: 5,
};

const sets = new Glide('.testemonials__inner', rollConfig).mount();
