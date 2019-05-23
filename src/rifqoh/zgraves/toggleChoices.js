submitTag = e => {
    e.preventDefault();
    const { chossenTags } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post(`${url}/api/create_tags/`, chossenTags, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token()}`
        }
      })
      .then(res => {
        this.setState({
          sent: true,
          loading: false
        });
      });
  };

  buttonPicker = (e, tags) => {
    e.preventDefault();
    const { chossenTags } = this.state;
    if (chossenTags.includes(tags)) {
      let newChossen = chossenTags.filter(e => {
        return e !== tags;
      });
      this.setState({
        chossenTags: newChossen
      });
    } else {
      this.setState({
        chossenTags: [...this.state.chossenTags, tags]
      });
    }
  };