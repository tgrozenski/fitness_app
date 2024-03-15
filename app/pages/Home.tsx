import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, } from 'react-native';
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import { router, } from "expo-router";

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);
var counter = 0;

const HomePage = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [del_Dialog, setdel_Dialog] = useState(false);
  const [text, setText] = useState('');

 useEffect( () => {
        console.log('Selected id is currently  ' + selectedId );
      }, [selectedId]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const show_delDialog = () => {
    setdel_Dialog(true);
  }

  const hide_delDialog = () => {
    setdel_Dialog(false);
  }

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    })
  }

  const change_editmode = () => {
    if(editmode) {
      setEditmode(false);
      showToast('Editmode Disabled');
    }

    else {
      setEditmode(true);
      showToast('Editmode Enabled');
    }
    }
    
  const itemTouchevent = (id: string, title: string) => {

    setSelectedId(id)
    
    if (editmode) {
      show_delDialog();
    } 
    else {
      //route to exercise list, pass id along!  
      
      router.push({pathname: "pages/exerciseList", params: {dayID: id, parentTitle: title}})
    }
  }


  
  const handleSubmit = () => {
    setVisible(false);
    const newItem: ItemData = {
      id: '' + counter, 
      title: text,
    };
    counter++
    DATA.push(newItem);
    console.log(DATA);
  }

  function handleDelete() {

    const index = DATA.findIndex((item) => item.id === selectedId);
    if (index !== -1) {
      // Remove the object from the array using splice()
      DATA.splice(index, 1);
      setdel_Dialog(false);
      return true; // Indicate successful deletion
    } else {
      // Item not found
      return false; // Indicate unsuccessful deletion
    }
  }
  
  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#170f7a' : 'orange';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      
      <Item
        item={item}
        onPress={() => 
          itemTouchevent(item.id, item.title)
                  }
        backgroundColor={backgroundColor}
        textColor={color}
      />
      
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Toggle EditMode" color="orange" onPress={ change_editmode }></Button>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <View style={styles.container}>
      <Button title="Create a New Day" color='orange' onPress={showDialog} />

      {/* dialog for creating day */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Create A new Day</Dialog.Title>
        <Dialog.Input 
        placeholder="Enter the name of your day!"
        onChangeText={text => setText(text)}>
        </Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleSubmit} />
        </Dialog.Container>

        {/* dialog for deleting */}
      <Dialog.Container visible={del_Dialog}>
        <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={hide_delDialog} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
    <Toast>

    </Toast>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'dodgerblue',
    borderRadius: 10
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20
  },
  title: {
    fontSize: 32,
  },
}); 

export default HomePage