const INITIAL_STATE = {
  userId: '',
  nav: '',
  lostOrFound: 'lost',
  coords: { lat: -23.5532003, lng: -46.6496674 },
  mapZoom: 12,
  theme: 'light',
  pets: undefined,
  favorites: [''],
  favoritesRoute: false,
  showPetProfile: false,
  showAccountOptionsScreen: false,
  petIndex: undefined,
  imageFiles: [undefined],
  email: '',
  password: '',
}

interface Pet {
  _id: string;
  name: string;
  breed: string;
  state: string;
  city: string;
  district: string;
  street: string;
  phone: string;
  contactName: string;
  animal: string;
  gender: string;
  photos: string[];
  about: string;
  colors: string[];
  location: {
    coordinates: number[];
  }
  user: string;
  updatedAt: string;
}

interface Pets extends Array<Pet> { };

interface Coords {
  lat: number;
  lng: number;
}

interface Action {
  type: string;
  payload: string | number | Coords | undefined | Pets | boolean | string[] | undefined[] | File[];
}

function appReducer(state: any = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload }
    case 'SET_NAV':
      return { ...state, nav: action.payload }
    case 'SET_LOST_OR_FOUND':
      return { ...state, lostOrFound: action.payload }
    case 'SET_COORDS':
      return { ...state, coords: action.payload }
    case 'SET_MAP_ZOOM':
      return { ...state, mapZoom: action.payload }
    case 'SET_PETS':
      return { ...state, pets: action.payload }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload }
    case 'SET_FAVORITES_ROUTE':
      return { ...state, favoritesRoute: action.payload }
    case 'SET_SHOW_PET_PROFILE':
      return { ...state, showPetProfile: action.payload }
    case 'SET_SHOW_ACCOUNT_OPTIONS_SCREEN':
      return { ...state, showAccountOptionsScreen: action.payload }
    case 'SET_PET_INDEX':
      return { ...state, petIndex: action.payload }
    case 'SET_IMAGE_FILES':
      return { ...state, imageFiles: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_APP_INITIAL_STATE':
      return state = INITIAL_STATE
    default:
      return state;
  }
}

export default appReducer;