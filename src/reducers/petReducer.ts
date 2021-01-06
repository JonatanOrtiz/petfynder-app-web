const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImageSite.png'

const INITIAL_STATE = {
  photos: [greyImage, greyImage, greyImage],
  name: '',
  breed: '',
  state: '',
  city: '',
  district: '',
  street: '',
  phone: '',
  contactName: '',
  animal: '',
  gender: '',
  about: '',
  colors: [],
  location: {
    coordinates: [0, 0]
  },
  user: '',
}

interface Action {
  type: string;
  payload: string[] | string | number | number[] | File[];
}

function petReducer(state: any = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'SET_LOST_OR_FOUND':
      return { ...state, lostOrFound: action.payload, }
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload, }
    case 'SET_NAME':
      return { ...state, name: action.payload, }
    case 'SET_BREED':
      return { ...state, breed: action.payload, }
    case 'SET_STATE':
      return { ...state, state: action.payload, }
    case 'SET_CITY':
      return { ...state, city: action.payload, }
    case 'SET_DISTRICT':
      return { ...state, district: action.payload, }
    case 'SET_STREET':
      return { ...state, street: action.payload, }
    case 'SET_PHONE':
      return { ...state, phone: action.payload, }
    case 'SET_CONTACT_NAME':
      return { ...state, contactName: action.payload, }
    case 'SET_ANIMAL':
      return { ...state, animal: action.payload, }
    case 'SET_GENDER':
      return { ...state, gender: action.payload, }
    case 'SET_ABOUT':
      return { ...state, about: action.payload, }
    case 'SET_COLORS':
      return { ...state, colors: action.payload }
    case 'SET_LOCATION':
      return { ...state, location: action.payload, }
    case 'SET_USER':
      return { ...state, user: action.payload, }
    case 'SET_NAV':
      return { ...state, nav: action.payload, }
    case 'SET_PET_INITIAL_STATE':
      return state = INITIAL_STATE
    case 'SET_PET':
      return state = action.payload
    default:
      return state;
  }
}

export default petReducer;
