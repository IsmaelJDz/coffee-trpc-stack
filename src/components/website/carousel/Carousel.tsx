import React from "react";

export const Carousel = () => {
  return (
    <section
      className="
      bg-[url('/images/coffee14.jpg')] bg-center bg-no-repeat bg-cover px-10 py-10 relative
      before:content-[''] before:absolute before:right-0 before:left-0 before:bottom-0 before:top-0
      before:z-0 before:bg-gradient-to-r from-carousel-rgba via-carousel-rgba-one to-carousel-rgba-second]
    "
    >
      <div className="relative z-10 max-w-3xl ml-0 md:ml-40 md:w-2/3 w-3/3">
        <h2 className="mx-0 my-6 text-2xl italic font-bold text-white">Nuestro café</h2>
        <p className="leading-8 text-white">
          Desde 1971, siempre ha sido y siempre será de la mejor calidad. Nos apasiona la labor de abastecernos de los
          mejores granos de café arábicos siguiendo estrictos principios éticos y tostarlos con el máximo cuidado.
          Nuestro café, nuestra pasión, sólo es comparable al placer de compartirlo.
        </p>
        <div className="px-0 py-8">
          <a className="p-3 text-white border border-white rounded cursor-pointer" href="#" title="Más información">
            Más información
          </a>
        </div>
      </div>
    </section>
  );
};
