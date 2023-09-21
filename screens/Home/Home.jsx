import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateFirstName} from '../../redux/reducers/User';
import Header from '../../component/Header/Header';
import {resetToInitialState} from '../../redux/reducers/User';

import styles from './styles';
import globalStyles from '../../assets/styles/globalStyle';
import Search from '../../component/Search/Search';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Tab from '../../component/Tab/Tab';
import {updateSelectedCategoryId} from '../../redux/reducers/Categories';
import SingleDonationItem from '../../component/SingleDonationItem/SingleDonationItem';
import {updateSelectedDonationId} from '../../redux/reducers/Donation';
import {Routes} from '../../navigation/Routes';
import {logOut} from '../../api/user';

export default function Home({navigation}) {
  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);
  const dispatch = useDispatch();

  const [donationItems, setDonationItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoryPageSize = 4;

  useEffect(() => {
    const items = donations.items;
    const filteredItems = items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(filteredItems);
  }, [categories.selectedCategoryId]);

  useEffect(() => {
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize),
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerIntroText}>Hello,</Text>
            <View style={styles.username}>
              <Header title={user.displayName + ' 👋'} type={1} />
            </View>
          </View>
          <View>
            <Image
              source={{uri: user.profileImg}}
              style={styles.profileImg}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={async () => {
                dispatch(resetToInitialState());
                await logOut;
              }}>
              <Header title={'Logout'} type={3} color={'#156CF7'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBox}>
          <Search />
        </View>
        <Pressable style={styles.highlightedImageContainer}>
          <Image
            style={styles.highlightedImage}
            source={require('../../assets/Images/highlighted_image.png')}
            resizeMode="contain"
          />
        </Pressable>
        <View style={styles.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={styles.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);

                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => {
              return (
                <View style={styles.categoryItem} key={item.categoryId}>
                  <Tab
                    tabId={item.categoryId}
                    onPress={value => dispatch(updateSelectedCategoryId(value))}
                    title={item.name}
                    isInactive={
                      item.categoryId !== categories.selectedCategoryId
                    }
                  />
                </View>
              );
            }}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={styles.donationItemsContainer}>
            {donationItems.map(item => {
              const categoryInfo = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );
              return (
                <View
                  style={styles.singleDonationItem}
                  key={item.donationItemId}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInfo,
                      });
                    }}
                    donationItemId={item.donationItemId}
                    uri={item.image}
                    donationTitle={item.name}
                    price={parseFloat(item.price)}
                    badgeTitle={categoryInfo.name}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
