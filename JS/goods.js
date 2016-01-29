


var Item = React.createClass({
	render: function() {
		return (
			<div className="item">
				<img src={this.props.imgSrc} />
				<h2 className="itemName">
					{this.props.itemName}
				</h2>
			</div>
		);
	}
});

var ItemList = React.createClass({
	render: function() {
		var chosenCategories = this.props.chosenCategories;
		var chosenSizes = this.props.chosenSizes;
		var itemCards = this.props.data.map(function(product) {
      var fitCategory = false, fitSize = false;
	      if (chosenCategories.length === 0) {
	      	fitCategory = true;
	      }

	      if (chosenSizes.length === 0) {
	      	fitSize = true;
	      }

	      if ($.inArray(product.category, chosenCategories) !== -1)  {
	      	fitCategory = true;
	      }

	      if ($.inArray(product.itemSize, chosenSizes) !== -1)  {
	      	fitSize = true;
	      }

	      if (fitSize && fitCategory) {
		      return (
		      	<Item imgSrc={product.imgSrc} itemName={product.itemName} key={product.id}>
		      	</Item>
		      )
	      } else {
	      	return;
	      }
		});

		var isObject = false;
    
    for (var i = 0; i < itemCards.length; i++) {
    	if (typeof itemCards[i] !== "undefined") {
    		isObject = true;
    	}
    };

    if (isObject === true) {
    	return (
		  	<div className="itemList">
		  	  {itemCards}
		  	</div>
			);
    } else {
    	return (
    		<h2 className="alert">No matches found</h2>
    );
	  }
	}
});

var Filter = React.createClass({
	handleChange: function(e) {
		if (e.target.checked) {
			var chosen = this.props.chosen
			chosen.push(e.target.value);
			this.props.onUserInput(chosen, this.props.filterName);
		} else {
			var chosen = this.props.chosen
			var index = chosen.indexOf(e.target.value);
			chosen.splice(index, 1);
			this.props.onUserInput(chosen, this.props.filterName);
		}
	},
	render: function() {
		var chosen = this.props.chosen;
		var handleChange = this.handleChange;
		var checkboxes = this.props.data.map(function(filterItem) {
			var checked = false;
			if ($.inArray(filterItem, chosen) !== -1) {
				checked = true;
			} 
			return (
				<p key={filterItem}>
        <input 
        type="checkbox" 
        value={filterItem} 
        checked={checked} 
        onChange={handleChange}
        />
        {filterItem}
        </p>
			)
		});
		return (
			<div className="filter">
      	<h3 className="filterName">
      		{this.props.filterName}
      	</h3>
      	{checkboxes}
      </div>
		);
	}
});

var FiltersList = React.createClass({
	render: function() {
		var categories = [];
    for (var i = 0; i < this.props.data.length; i++) {
    	var c = this.props.data[i].category;
      categories.push(c);
    }

    var sizes = [];
    for (var i = 0; i < this.props.data.length; i++) {
    	var c = this.props.data[i].itemSize;
      sizes.push(c);
    }
    return (
    	<div className="filtersList">
	    	<Filter onUserInput={this.props.onUserInput} data={cleanArray(categories)} chosen={this.props.chosenCategories} filterName="Categories" />
	    	<Filter onUserInput={this.props.onUserInput} data={cleanArray(sizes)} chosen={this.props.chosenSizes} filterName="Sizes" />
    	</div>
    );
	}
});


function cleanArray(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var c = array[i];
	  if ($.inArray(c, newArray) === -1) {
	    newArray.push(c);
	  }
  }
  return newArray;
};

var FilterableList = React.createClass({
	getInitialState: function() {
		return {
			chosenCategories: [],
			chosenSizes: []
		};
	},
	handleUserInput: function(chosen, filterName) {
		if (filterName === "Categories") {
				this.setState({
				chosenCategories: chosen,
				chosenSizes: this.state.chosenSizes
			});
		}
		if (filterName === "Sizes") {
			  this.setState({
			  chosenCategories: this.state.chosenCategories,
			  chosenSizes: chosen
			  });
		}

	},
	render: function() {
		return (
			<div className="filteredList">
			  <FiltersList 
			  data={this.props.data} 
			  chosenSizes={this.state.chosenSizes}
			  chosenCategories={this.state.chosenCategories}
			  onUserInput={this.handleUserInput}
			  />
  			<ItemList
  			data={this.props.data} 
  			chosenSizes={this.state.chosenSizes}
			  chosenCategories={this.state.chosenCategories}
  			/>
			</div>
		);
	}
});

var data = [
  {id: 1, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000028320/e167e8c5ec0f0ea9b3100b072e7ece26/236x370.jpg", category: "T-Shirt", itemName: "Calvin Klein", itemSize: "XL" },
  {id: 2, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000030869/751d3e831abc5091a7307026f08f2f97/236x370.jpg", category: "Dress", itemName: "Fashion love story", itemSize: "M" },
  {id: 3, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000030887/489cd131bcc0e35a3aa95ce5b9865f90/236x370.jpg", category: "Dress", itemName: "Lady collection", itemSize: "L" },
  {id: 4, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000030946/fdff8cca518299a5a5bd60fc39d784e6/236x370.jpg", category: "Shirt", itemName: "Business woman", itemSize: "L" },
  {id: 5, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000030893/335dc6710e7c41edbacc2b03743b49d2/236x370.jpg", category: "Shirt", itemName: "Eat pray love",itemSize: "L" },
  {id: 6, imgSrc: "http://blob1.trendsbrands.ru/v20151209/thumbs/%D0%A3%D0%A2000028346/a7857d42de0b0549277b05b2376d18ae/236x370.jpg", category: "T-Shirt", itemName: "De and Ge",itemSize: "M" },
];



ReactDOM.render(
  <FilterableList data={data} />,
  document.getElementById('filterPage')
);