import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Select,
  Option,
  Dropdown,
  DropdownList,
  DropdownListItem,
  Button,
  Form
} from '@contentful/forma-36-react-components';
import { init, locations, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { DropdownEditor } from '@contentful/field-editor-dropdown';
import { MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';



/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  body: Long text
 *  hasAbstract: Boolean
 *  abstract: Long text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);

    this.fields = {
      componentName: props.sdk.entry.fields.componentName,
      chooseAComponent: props.sdk.entry.fields.chooseAComponent,
      title: props.sdk.entry.fields.title,
      embedScript: props.sdk.entry.fields.embedScript,
      anchor: props.sdk.entry.fields.title.anchor,
      showcaseGrid: props.sdk.entry.fields.showcaseGrid
    }

    this.state = {
      sdk: props.sdk.entry,
      locales: props.sdk.locales,
      componentName: props.sdk.entry.fields.componentName.getValue(),
      title: props.sdk.entry.fields.title.getValue(),
      componentOptions: props.sdk.entry.fields.chooseAComponent.validations[0].in,
      chooseAComponent: props.sdk.entry.fields.chooseAComponent,
      //selectedComponent: props.sdk.entry.fields.chooseAComponent.getValue() || 'Choose an Option',
      embedScript: props.sdk.entry.fields.embedScript.getValue(),
      showcaseGrid: props.sdk.entry.fields.showcaseGrid.getValue(),
      showEmbedScript: false,
      showShowcaseGrid: false,
      showProfileCards: false,
      showAnchor: true,
      showTitle: false,
      showLogoBanner: true,
      showCards: true,
      showSpacer: true,
      showProductShowcase: true,
      showFeaturedArticle: true
    };


    debugger;
  }

  onComponentNameChangeHandler = event => {
    const value = event.target.value;
    this.setState({ componentName: value });
    this.fields.componentName.setValue(value);
  };

  onChooseAComponentChangeHandler = event => {
    const value = event.target.value;
    this.setState({ selectedComponent: value });
    this.props.sdk.entry.fields.chooseAComponent.setValue(value);
  };

  onEmbedScriptChangeHandler = event => {
    const value = event.target.value;
    this.setState({ componentName: value });
    this.props.sdk.entry.fields.embedScript.setValue(value);
  };

  onAnchorChangeHandler = event => {
    const value = event.target.value;
    this.setState({ anchor: value });
    this.props.sdk.entry.fields.anchor.setValue(value);
  };

  onTitleChangeHandler = event => {
    const value = event.target.value;
    this.setState({ title: value });
    this.props.sdk.entry.fields.title.setValue(value);
  };

  onHeadingTagChangeHandler = event => {
    const value = event.target.value;
    this.setState({ headingTag: value });
    this.props.sdk.entry.fields.headingTag.setValue(value);
  };

  onSpacerChangeHandler = event => {
    const value = event.target.value;
    this.setState({ spacer: value });
    this.props.sdk.entry.fields.spacer.setValue(value);
  };

  onShowcaseGridChangeHandler = event => {
    const value = event.target.value;
    this.setState({ spacer: value });
    this.props.sdk.entry.fields.showcaseGrid.setValue(value);
  };

  


  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>Component Picker</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <SectionHeading>Component Name</SectionHeading>
        <TextInput
          testId="component-name"
          onChange={this.onComponentNameChangeHandler}
          value={this.state.componentName}
        />
      
      <SectionHeading>Selected component currently is: { this.state.selectedComponent }</SectionHeading>

         <Select
      id="optionSelect"
      name="optionSelect"
      required
      onChange={this.onChooseAComponentChangeHandler}>
        <Option key="choose" value="chooseAnOption">Choose a Component</Option>
        {this.state.componentOptions.map(component => (
        <Option key={component} value={component}>{ component }</Option> 
        ))}
  
    </Select>
    
    
    {this.state.selectedComponent === 'Embedded Script' && (
      <React.Fragment>
        <SectionHeading>Embed Script</SectionHeading>
        <Textarea
              testId="field-embed-script"
              onChange={this.onAnchorChangeHandler}
              value={this.state.anchor}
            />
      </React.Fragment>
    )}

    {this.state.selectedComponent === "Anchor Positioning" && (
      <React.Fragment>
        <SectionHeading>Anchor</SectionHeading>
        <TextInput
          testId="component-name"
          
          onChange={this.onAnchorChangeHandler}
          value={this.state.anchor}
        />
      </React.Fragment>
    )}

{this.state.selectedComponent === "Showcase Grid" && (

      <React.Fragment>
          {/* { console.log(this.state.sdk.entry.fields.showcaseGrid) } */}
        { console.log(this.props.sdk)}

        <SectionHeading>Showcase Grid</SectionHeading>
        
        {this.props.sdk && (
          <MultipleEntryReferenceEditor
          viewType="link"
          sdk={this.props.sdk.entry.fields.showcaseGrid}
          isInitiallyDisabled="false"
          hasCardEditActions="false"
          onAction={this.onShowcaseGridChangeHandler}
          renderCustomCard="false"
          renderCustomActions="false"
          //getEntityUrl="showcaseGrid"
          type="showcaseGrid"
          //fields={this.props.sdk.entry.fields.showcaseGrid}
          //field="entries"
          parameters={{
            instance: {
              canCreateEntity: true,
              canLinkEntity: true,
              bulkEditing: false
            },
          }}
        />
        )}

        {this.props.sdk && ('Worked')}
      

      

      </React.Fragment>
    )}

{/* {this.state.selectedComponent === "Profile Cards" && (
      <React.Fragment>
        <SectionHeading>Profile Cards</SectionHeading>
        
      </React.Fragment>
    )}

{this.state.selectedComponent === "Cards" && (
      <React.Fragment>
        <SectionHeading>Cards</SectionHeading>
        
      </React.Fragment>
    )}

{this.state.selectedComponent === "Logo Banner" && (
      <React.Fragment>
        <SectionHeading>Logo Banner</SectionHeading>
        
      </React.Fragment>
    )}

{this.state.selectedComponent === "Featured Article" && (
      <React.Fragment>
        <SectionHeading>Featured Article</SectionHeading>
        
      </React.Fragment>
    )}

{this.state.selectedComponent === "Product Showcase" && (
      <React.Fragment>
        <SectionHeading>Product Showcase</SectionHeading>
        
      </React.Fragment>
    )} */}

{/* {this.state.selectedComponent === "Spacer" && (
      <React.Fragment>
        <SectionHeading>Spacer</SectionHeading>
        <TextInput
          testId="component-name"
          onChange={this.onTitleChangeHandler}
          value={this.state.title}
        />
         <Select
      id="optionSelect"
      name="optionSelect">
        
        <Option value="test">test </Option> 
  
    </Select>
      </React.Fragment>
    )}

    {this.state.selectedComponent === "Title" && (
      <React.Fragment>
        <SectionHeading>Title</SectionHeading>
        <TextInput
          testId="component-name"
          onChange={this.onTitleChangeHandler}
          value={this.state.title}
        />
         <Select
      id="optionSelect"
      name="optionSelect">
        
        <Option value="test">test </Option> 
  
    </Select>
      </React.Fragment>
    )} */}

        
     
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
