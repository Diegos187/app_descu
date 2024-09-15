import React, { useState } from 'react';
import './App.css';
import { Heart, Share2, Menu } from 'lucide-react';
import 'animate.css';
import SearchComponent from './components/SearchComponent'; // Importa el componente de búsqueda

const products = [
  { id: 1, name: 'Produc 1', liked: false, category: 'Saludable', image: 'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg', description: 'Los mejores platillos para cuidar tu salud', price: 5000, extraInfo: 'Condiciones:...' },
  { id: 2, name: 'Producto 2', liked: false, category: 'Hamburguesas', image: 'https://s3.abcstatics.com/media/gurmesevilla/2012/01/comida-rapida-casera.jpg', description: 'Las mejore HAMBURGUESAS del país', price: 3000, extraInfo: 'Condiciones:...' },
  { id: 3, name: 'Producto 3', liked: false, category: 'Tacos', image: 'https://content.skyscnr.com/m/2dcd7d0e6f086057/original/GettyImages-186142785.jpg', description: 'Ven a probar los mejores TACOS de México a Chile', price: 2000, extraInfo: 'Condiciones:...' },
  { id: 4, name: 'Producto 4', liked: false, category: 'Pizzas', image: 'https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg', description: 'Ricas PIZZAS lleve sus pizzas', price: 8000, extraInfo: 'Condiciones:...' },
  { id: 5, name: 'Producto 5', liked: false, category: 'Pastas', image: 'https://static.abc.es/media/familia/2018/05/23/Minevera_Pasta-k4KC--1240x698@abc.jpg', description: 'Pastas y todo tipo de comida italiana', price: 6000, extraInfo: 'Condiciones:...' },
  { id: 6, name: 'Producto 6', liked: false, category: 'Carne', image: 'https://c.files.bbci.co.uk/DBBF/production/_105055265_bandejapaisa.jpg', description: 'Carne', price: 3000, extraInfo: 'Condiciones: ...' },
  // Más productos
  { id: 7, name: 'Producto 7', liked: false, category: 'Completos', image: 'https://comerciante.lacuarta.com/wp-content/uploads/2022/11/Tema-04-Comida-Rapida-ok.jpg', description: 'Los mejores platillos para cuidar tu salud', price: 5000, extraInfo: 'Condiciones: ...' },
  { id: 8, name: 'Producto 8', liked: false, category: 'Helados', image: 'https://www.vitamixespana.com/recetas/wp-content/uploads/2017/05/helado-de-vainilla-vitamix.jpg', description: 'Las mejore HAMBURGUESAS del país', price: 3000, extraInfo: 'Condiciones: ...' },
  { id: 9, name: 'Producto 9', liked: false, category: 'Tacos', image: 'https://fotografias.larazon.es/clipping/cmsimages01/2023/11/16/080445F5-DC20-409E-A8B9-498C90C12C90/dieta-mexicana-reduce-inflamacion-colesterol-malo-debido-sus-componentes_98.jpg?crop=1280,720,x0,y0&width=1900&height=1069&optimize=low&format=webply', description: 'Ven a probar los mejores TACOS de México a Chile', price: 5000, extraInfo: 'Condiciones: ...' },
  //mas productos
];


//
function App() {
  const [likedProducts, setLikedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(""); // Filtro de categoría seleccionado
  const [priceFilter, setPriceFilter] = useState(""); // Filtro de precios seleccionado

  // Función para alternar el "like" de un producto
  const toggleLike = (id) => {
    const updatedProducts = likedProducts.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setLikedProducts(updatedProducts);

    // Actualizar los productos filtrados también
    let updatedFilteredProducts = filteredProducts.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setFilteredProducts(updatedFilteredProducts);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


// Función para manejar los filtros combinados
const handleFilters = (selectedCategory, selectedPriceSort) => {
  // Crear una copia de likedProducts para filtrar
  let filtered = [...likedProducts]; 

  // Filtrar por categoría si hay una seleccionada
  if (selectedCategory) {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // Ordenar por precio si hay un orden seleccionado
  if (selectedPriceSort) {
    filtered = filtered.sort((a, b) => {
      if (selectedPriceSort === 'low-high') {
        return a.price - b.price; // Orden ascendente
      } else if (selectedPriceSort === 'high-low') {
        return b.price - a.price; // Orden descendente
      }
      return 0;
    });
  }

  // Actualizar los productos filtrados sin modificar los originales
  setFilteredProducts(filtered);
};

// Manejo de cambio en el filtro de categoría
const handleCategoryFilter = (e) => {
  const selectedCategory = e.target.value;
  setCategoryFilter(selectedCategory); // Guardamos la categoría seleccionada
  handleFilters(selectedCategory, priceFilter);
};

// Manejo de cambio en el filtro de precios
const handlePriceSort = (e) => {
  const selectedPriceSort = e.target.value;
  setPriceFilter(selectedPriceSort); // Guardamos el filtro de precios seleccionado
  handleFilters(categoryFilter, selectedPriceSort);
};


  const toggleExpand = (id) => {
    setExpandedProducts((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Cambia el estado del producto actual
    }));
  };

  return (
    <div className="app">
      <div className='content'>
        <header className="header">
          <a href='#'><h1 className='animate__animated animate__backInLeft'>UTEMY</h1></a>
          <Menu className="menu-icon" onClick={toggleMenu} />
          <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </nav>
        </header>

        <section className='bienvenida-content'>
          <div className="blur-background"></div> {/* Contenedor del fondo */}
          <div className="content-container">
            <h1 className='animate__animated animate__bounceInRight'>Bienvenido a la sección de descuentos</h1>
            <p>Encuentra los mejores descuentos en comida a través de esta sección de UTEMY, y ahorra a lo grande.</p>

            <SearchComponent products={likedProducts} setFilteredProducts={setFilteredProducts} />

            <nav className="nav">
              <button className="filter-btn">Ingresar ubicación</button>
              <select className="filter-btn" onChange={handleCategoryFilter}>
                <option value="">Filtrar por categoría</option>
                <option value="Saludable">Saludable</option>
                <option value="Hamburguesas">Hamburguesas</option>
                <option value="Tacos">Tacos</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Pastas">Pastas</option>
                <option value="Carne">Carne</option>
                <option value="Helados">Helados</option>
                <option value="Completos">Completos</option>
              </select>
              <select className="filter-btn" onChange={handlePriceSort}>
                <option value="">Filtrar por precio</option>
                <option value="low-high">Menor a Mayor</option>
                <option value="high-low">Mayor a Menor</option>
              </select>
            </nav>
          </div>
        </section>

        <section className='hola'>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className={`product-card ${expandedProducts[product.id] ? 'expanded' : ''}`}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>

                <div className={`extra-info ${expandedProducts[product.id] ? 'show' : ''}`}>
                  <h3>{product.extraInfo}</h3>
                </div>
                <div className="product-actions">
                  <Heart 
                    color={product.liked ? 'red' : 'gray'} 
                    className={`like-btn ${product.liked ? 'liked' : ''}`} 
                    onClick={() => toggleLike(product.id)}
                  />
                  <button className="more-info-btn" onClick={() => toggleExpand(product.id)}>
                    {expandedProducts[product.id] ? 'Ocultar ↑' : 'Condiciones ↓'}
                  </button>
                  <Share2 className="share-btn" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className='footer-content'>
            <div className='link'>
              <a href='#'><h1>UTEMY</h1></a>
            </div>
            <div className='link'>
              <ul>
                <li><a href='#'>Inicio</a></li>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;


