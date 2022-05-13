import { fetchedLanguages } from './apis/api.js';
import SearchInput from './SearchInput.js';
import SelectedLanguage from './SelectedLanguages.js';
import Suggestion from './Suggestion.js';

export default function App({ $target }) {
    if (localStorage.getItem('appState')) {
        this.state = JSON.parse(localStorage.getItem('appState'));
    } else {
        this.state = {
            fetchedLanguages: [],
            selectedLanguages: [],
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

    const selectedLanguages = new SelectedLanguage({
        $target,
        initialState: this.state.selectedLanguages,
    });

    const searchInput = new SearchInput({
        $target,
        initialState: this.state.keyword,
        onChange: async (keyword) => {
            localStorage.setItem('keyword', keyword);
            if (keyword.length === 0) {
                this.setState({
                    fetchedLanguages: [],
                });
            } else {
                const languages = await fetchedLanguages(keyword);
                this.setState({
                    fetchedLanguages: languages,
                    keyword,
                });
            }
        },
    });

    const suggestion = new Suggestion({
        $target,
        initialState: {
            selectedIndex: 0,
            items: this.state.fetchedLanguages ?? [],
            keyword: this.state.keyword,
        },
        onSelect: (language) => {
            alert(language);

            const nextSelectedLanguages = [...this.state.selectedLanguages];

            const index = nextSelectedLanguages.findIndex(
                (selectedLanguage) => selectedLanguage === language
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
