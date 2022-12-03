import { Banner } from "../banner"
import { ProductList } from "../productList"

export const Home = (props) => {
  const { dataSearch } = props;
  return(
    <div>
      <Banner />
      <ProductList dataSearch={dataSearch} />
    </div>
  )
}