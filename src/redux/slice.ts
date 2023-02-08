import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {fetchAndFormatData} from "../utils/utils";
import { Categories, Category } from "../types/category.types";
/**
 * Un thunk que realiza una petición a la API de Pokemon para obtener una lista de categorías de elementos.
 * @returns {Array} Una lista de objetos, cada uno con dos propiedades: "name" y "url".
 * @throws {Error} Si ocurre un error durante la petición.
 */
export const fetchCategoriesThunk = createAsyncThunk(
  "pokemon/fetchCategoriesThunk",
  async () => {
    try {
      fetchCategoriesPending();
      const response = await fetch("https://pokeapi.co/api/v2/item-category/");
      const data = await response.json();
      selectCategoryPending();
      return data.results;
    } catch (error) {
      fetchCategoriesFailed();
    }
  }
);


/**
 * Un thunk que selecciona una categoría y devuelve un objeto formateado con el nombre de la categoría y sus elementos.
 * @param {string} url - URL de la categoría a seleccionar
 * @returns {Object} Un objeto con dos propiedades: "name" y "items".
 * @throws {Error} Si ocurre un error durante la petición o el formato de datos.
 */
export const selectCategoryThunk = createAsyncThunk("pokemon/selectCategoryThunk",async (url:string) => {
    try {
      selectCategory();
      const responseCategory = await fetch(`${url}`);
      const categoryData = await responseCategory.json();
      const { items, name:CategoryName } = categoryData;
      const allURL = await items.map((item: { url: string }) => item.url);
      const formatItemsResult = await fetchAndFormatData(allURL);
      const categoryFormated = { name: CategoryName, items: formatItemsResult };
      fetchCategoriesSuccess();
      return categoryFormated;

    } catch (error) {
      fetchCategoryFailed();
    }
  }
);


interface State {
  isLoading: boolean,
  categories: Categories[],
  selectedCategory:Category,

}

 const initialState: State = {
   isLoading: false,
   categories: [],
   selectedCategory: { name: "", items:[ { name: "", sprite: "" } ]},
 };

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchCategoriesPending: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state) => {
      state.isLoading = false;
    },
    fetchCategoriesFailed: (state) => {
      state.isLoading = false;
    },
    selectCategory: (state) => {
      state.isLoading = true;
    },
    selectCategoryPending: (state) => {
      state.isLoading = true;
    },
    selectCategorySuccsess: (state) => {
      state.isLoading = true;
    },
    fetchCategoryFailed:(state)=>{
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategoriesThunk.fulfilled,
        (state: State, action: PayloadAction<Categories[]>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        selectCategoryThunk.fulfilled,
        (state: State, action: any) => {
          state.selectedCategory = action.payload;
        }
      );
  },
});

export const {
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
  selectCategory,
  selectCategoryPending,
  selectCategorySuccsess,
  fetchCategoryFailed,
} = pokemonSlice.actions;

export default pokemonSlice.reducer
