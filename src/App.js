import SearchInput from './components/SearchInput.js';
import SelectedLanguages from './components/SelectedLanguages.js';
import Suggestion from './components/Suggestion.js';
import { fetchedLanguages } from './utils/api.js';

export default function App({ $target }) {
    if (localStorage.getItem('appState')) {
        this.state = JSON.parse(localStorage.getItem('appState'));
    } else {
        this.state = {
            fetchedLanguages: [],
            selectedLanguages: [],
            keyword: '',
        };
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };

        localStorage.setItem('appState', JSON.stringify(this.state));
        suggestion.setState({
            selectedIndex: 0,
            items: this.state.fetchedLanguages,
            keyword: this.state.keyword,
        });
        selectedLanguages.setState(this.state.selectedLanguages);
    };

    const selectedLanguages = new SelectedLanguages({
        $target,
        initialState: this.state.selectedLanguages,
    });

    const searchInput = new SearchInput({
        $target,
        initialState: this.state.keyword,
        onChange: async (keyword) => {
            this.state.keyword = keyword;
            localStorage.setItem('keyword', keyword);
            if (keyword.length === 0) {
                this.setState({
                    fetchedLanguages: [],
                });
            } else {
                const languages = await fetchedLanguages(keyword);
                this.setState({
                    fetchedLanguages: languages,
                    keyword: this.state.keyword,
                });
            }
        },
    });

    const suggestion = new Suggestion({
        $target,
        initialState: {
            keyword: this.state.keyword,
            selectedIndex: 0,
            items: this.state.fetchedLanguages,
        },
        onSelect: (language) => {
            alert(language);
            const nextSelectedLanguages = [...this.state.selectedLanguages];
            const index = nextSelectedLanguages.findIndex(
                (selectedLanguages) => selectedLanguages === language
            );
            if (index > -1) {
                nextSelectedLanguages.splice(index, 1);
            }
            nextSelectedLanguages.push(language);

            this.setState({
                ...this.state,
                selectedLanguages: nextSelectedLanguages,
            });
        },
    });
}
