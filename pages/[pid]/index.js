import { useRouter } from "next/router";
import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

    if (!loadedProduct) {
      return <p>Loading...</p>;
    }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  console.log(product);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(product => product.id);

    const paths = ids.map(id => ({ params: { pid: id } }));
  return {
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   //   { params: { pid: "p3" } },
    // ],
    paths: paths,
    fallback: true,
  };
}

export default ProductDetailPage;
