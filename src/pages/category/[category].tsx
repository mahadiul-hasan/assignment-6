import ProductCard from "@/components/UI/ProductCard";
import Layout from "@/components/layout/Layout";
import { IProduct } from "@/types/globalTypes";
import React, { ReactElement } from "react";

interface Props {
	products: IProduct[];
}

const Category = ({ products }: Props) => {
	return (
		<div className="my-12 px-5 mx-auto">
			<div className="grid grid-auto-fit-lg gap-4">
				{products.map((product: IProduct) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</div>
	);
};

Category.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Category;

export const getStaticPaths = async () => {
	const res = await fetch("https://pc-house.vercel.app/categories");
	const data = await res.json();

	const paths = data.data.map((category: { category: string }) => ({
		params: { category: category.category },
	}));

	return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
	const { params } = context;
	const res = await fetch(
		`https://pc-house.vercel.app/products/category/${params.category}`
	);

	const data = await res.json();

	return {
		props: {
			products: data,
		},
	};
};
