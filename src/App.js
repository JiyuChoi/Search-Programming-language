import { fetchedLanguages } from './apis/api.js';
import SearchInput from './SearchInput.js';
import SelectedLanguage from './SelectedLanguages.js';
import Suggestion from './Suggestion.js';

export default function App({ $target }) {
    this.state = {
        fetchedLanguages: [],
        selectedLanguages: [],
    };

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        suggestion.setState({
            selectedIndex: 0,
            items: this.state.fetchedLanguages,
        });
        selectedLanguage.setState(this.state.selectedLanguages);
    };

    const searchInput = new SearchInput({
        $target,
        initialState: '',
        onChange: async (keyword) => {
            if (keyword.length === 0) {
                this.setState({
                    fetchedLanguages: [],
                });
            } else {
                const languages = await fetchedLanguages(keyword);
                this.setState({
                    fetchedLanguages: languages,
                });
            }
        },
    });

    const suggestion = new Suggestion({
        $target,
        initialState: {
            cursor: 0,
            items: [],
        },
        onSelect: (language) => {
            alert(language);
            // 선택한 언어 selectedLanguages에 추가하기
            const nextSelectedLanguages = [...this.state.selectedLanguages];
            const index = nextSelectedLanguages.findIndex(
                (selectedLanguages) => selectedLanguages === language
            );
            console.log(nextSelectedLanguages, index);
            if (index > -1) {
                nextSelectedLanguages.splice(index, 1);
            }
            nextSelectedLanguages.push(language);
            console.log(nextSelectedLanguages, index);

            this.setState({
                ...this.state,
                selectedLanguages: nextSelectedLanguages,
            });
            console.log(this.state);
        },
    });

    const selectedLanguage = new SelectedLanguage({
        $target,
        initialState: [],
    });
}
