export interface AboutType {
  data: {
    allContentfulAboutPage: {
      edges: {
        node: {
          title: string;
          body: any;
          image: {
            file: {
              url: string;
            };
          };
        };
      }[];
    };
  };
}
