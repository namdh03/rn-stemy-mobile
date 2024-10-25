/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddToCart($hasLab: Boolean!, $productId: Float!, $quantity: Float!) {\n    addToCart(hasLab: $hasLab, productId: $productId, quantity: $quantity) {\n      id\n    }\n  }\n": types.AddToCartDocument,
    "\n  query GetCart {\n    carts {\n      id\n      hasLab\n      product {\n        id\n        name\n        price\n        images {\n          url\n        }\n        lab {\n          price\n        }\n      }\n      quantity\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation DeleteCarts($cartId: [Int!]!) {\n    deleteCarts(cartId: $cartId)\n  }\n": types.DeleteCartsDocument,
    "\n  mutation UpdateCart($cartId: Float!, $quantity: Float!) {\n    updateCart(cartId: $cartId, quantity: $quantity) {\n      id\n    }\n  }\n": types.UpdateCartDocument,
    "\n  query GetCartCount {\n    countCart\n  }\n": types.GetCartCountDocument,
    "\n  query GetProductCategories {\n    productCategories {\n      id\n      name\n      title\n      type\n    }\n  }\n": types.GetProductCategoriesDocument,
    "\n  mutation CreateOrder(\n    $fullName: String!\n    $address: String!\n    $cartIds: [Int!]!\n    $paymentProvider: PaymentProvider!\n    $phone: String!\n  ) {\n    createOrder(\n      fullName: $fullName\n      address: $address\n      cartIds: $cartIds\n      paymentProvider: $paymentProvider\n      phone: $phone\n    )\n  }\n": types.CreateOrderDocument,
    "\n  mutation CheckoutOrder($input: CheckoutOrderInput!) {\n    checkoutOrder(input: $input)\n  }\n": types.CheckoutOrderDocument,
    "\n  mutation CreateFeedback($orderId: Float!, $input: [CreateFeedbackInput!]!) {\n    createFeedback(orderId: $orderId, input: $input)\n  }\n": types.CreateFeedbackDocument,
    "\n  query GetHome {\n    featuredProduct: products(currentItem: 10, order: DESC, sort: \"rating\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    bestSellers: products(currentItem: 10, order: DESC, sort: \"sold\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    newArrivals: products(currentItem: 10, order: DESC, sort: \"createdAt\") {\n      items {\n        id\n        feedbacks {\n          id\n        }\n        images {\n          url\n        }\n        name\n        price\n        rating\n      }\n    }\n\n    topRatedProduct: products(currentItem: 10, order: DESC, sort: \"rating\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    specialOffers: products(order: ASC, sort: \"price\", currentItem: 10) {\n      items {\n        id\n        feedbacks {\n          id\n        }\n        images {\n          url\n        }\n        name\n        price\n        rating\n      }\n    }\n  }\n": types.GetHomeDocument,
    "\n  query GetMyPurchases($search: String!) {\n    searchOrder(search: $search) {\n      orderItems {\n        userLab {\n          isActive\n          id\n          updatedAt\n          createdAt\n        }\n        product {\n          name\n          images {\n            url\n          }\n          id\n        }\n        tickets {\n          id\n        }\n        id\n      }\n      id\n      createdAt\n    }\n  }\n": types.GetMyPurchasesDocument,
    "\n  query SearchOrder($search: String!) {\n    searchOrder(search: $search) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n": types.SearchOrderDocument,
    "\n  query GetOrderByStatus($status: OrderStatus!) {\n    searchOrder(search: \"\", status: $status) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n": types.GetOrderByStatusDocument,
    "\n  query GetOrderByToShip {\n    searchOrderByPaid: searchOrder(search: \"\", status: PAID) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n    searchOrderByDelivering: searchOrder(search: \"\", status: DELIVERING) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n": types.GetOrderByToShipDocument,
    "\n  query GetCountOrder {\n    countOrder {\n      delivering\n      delivered\n      paid\n      rated\n      received\n      unpaid\n    }\n  }\n": types.GetCountOrderDocument,
    "\n  query GetHistoryOrder {\n    searchOrder(search: \"\") {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n": types.GetHistoryOrderDocument,
    "\n  mutation RepayOrder($orderId: Float!) {\n    repayOrder(orderId: $orderId)\n  }\n": types.RepayOrderDocument,
    "\n  mutation ReceivedOrder($orderId: Float!) {\n    receiveOrder(orderId: $orderId) {\n      id\n    }\n  }\n": types.ReceivedOrderDocument,
    "\n  mutation ReOrder($orderId: Float!) {\n    reOrder(orderId: $orderId) {\n      id\n      hasLab\n      product {\n        id\n        name\n        price\n        images {\n          url\n        }\n        lab {\n          price\n        }\n      }\n      quantity\n    }\n  }\n": types.ReOrderDocument,
    "\n  query GetProduct($id: Float!) {\n    product(id: $id) {\n      categories {\n        id\n        name\n        type\n        title\n      }\n      images {\n        id\n        url\n      }\n      description\n      id\n      name\n      price\n      rating\n      sold\n      feedbacks {\n        note\n        createdAt\n        id\n        rating\n        user {\n          fullName\n        }\n      }\n      lab {\n        price\n      }\n    }\n    products(currentItem: 10, order: ASC, sort: \"price\") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  query GetFeaturedProduct {\n    products(currentItem: 10, order: ASC, sort: \"price\") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n": types.GetFeaturedProductDocument,
    "\n  query SearchProductByName($search: String!) {\n    products(search: $search) {\n      items {\n        id\n        name\n      }\n    }\n  }\n": types.SearchProductByNameDocument,
    "\n  query FilterAndSortingProduct(\n    $categoryIds: [Int!]!\n    $currentItem: Int!\n    $currentPage: Int!\n    $maxPrice: Int\n    $maxRating: Int\n    $minPrice: Int\n    $minRating: Int\n    $order: SortOrder!\n    $search: String!\n    $sort: String!\n  ) {\n    products(\n      categoryIds: $categoryIds\n      currentItem: $currentItem\n      currentPage: $currentPage\n      maxPrice: $maxPrice\n      maxRating: $maxRating\n      minPrice: $minPrice\n      minRating: $minRating\n      order: $order\n      search: $search\n      sort: $sort\n    ) {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n": types.FilterAndSortingProductDocument,
    "\n  query GetMyTickets {\n    myTickets {\n      id\n      createdAt\n      title\n      status\n      senderComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n    }\n  }\n": types.GetMyTicketsDocument,
    "\n  query GetTicketById($ticketId: Float!) {\n    ticket(ticketId: $ticketId) {\n      id\n      createdAt\n      closedAt\n      title\n      status\n      senderComment\n      replierComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n      replyImages {\n        id\n        url\n      }\n      images {\n        id\n        url\n      }\n    }\n  }\n": types.GetTicketByIdDocument,
    "\n  query GetStaffTicketsByStatus($status: TicketStatus) {\n    myTickets(status: $status) {\n      id\n      createdAt\n      title\n      status\n      senderComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n    }\n  }\n": types.GetStaffTicketsByStatusDocument,
    "\n  mutation ReplyTicket($comment: String!, $ticketId: Float!, $images: [File!]!) {\n    replyTicket(comment: $comment, ticketId: $ticketId, images: $images) {\n      id\n    }\n  }\n": types.ReplyTicketDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation SendResetPasswordOTP($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n": types.SendResetPasswordOtpDocument,
    "\n  mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n": types.GetTokenResetPasswordDocument,
    "\n  mutation ResetPassword($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation LoginWithGoogle($code: String!) {\n    loginWithGoogle(code: $code) {\n      access_token\n    }\n  }\n": types.LoginWithGoogleDocument,
    "\n  query Me {\n    me {\n      createdAt\n      email\n      fullName\n      id\n      phone\n      role\n      status\n      updatedAt\n      address\n    }\n  }\n": types.MeDocument,
    "\n  mutation UpdateMe($address: String, $email: String, $fullName: String, $phone: String) {\n    updateUser(address: $address, email: $email, fullName: $fullName, phone: $phone) {\n      id\n    }\n  }\n": types.UpdateMeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToCart($hasLab: Boolean!, $productId: Float!, $quantity: Float!) {\n    addToCart(hasLab: $hasLab, productId: $productId, quantity: $quantity) {\n      id\n    }\n  }\n"): typeof import('./graphql').AddToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCart {\n    carts {\n      id\n      hasLab\n      product {\n        id\n        name\n        price\n        images {\n          url\n        }\n        lab {\n          price\n        }\n      }\n      quantity\n    }\n  }\n"): typeof import('./graphql').GetCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCarts($cartId: [Int!]!) {\n    deleteCarts(cartId: $cartId)\n  }\n"): typeof import('./graphql').DeleteCartsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCart($cartId: Float!, $quantity: Float!) {\n    updateCart(cartId: $cartId, quantity: $quantity) {\n      id\n    }\n  }\n"): typeof import('./graphql').UpdateCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCartCount {\n    countCart\n  }\n"): typeof import('./graphql').GetCartCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductCategories {\n    productCategories {\n      id\n      name\n      title\n      type\n    }\n  }\n"): typeof import('./graphql').GetProductCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrder(\n    $fullName: String!\n    $address: String!\n    $cartIds: [Int!]!\n    $paymentProvider: PaymentProvider!\n    $phone: String!\n  ) {\n    createOrder(\n      fullName: $fullName\n      address: $address\n      cartIds: $cartIds\n      paymentProvider: $paymentProvider\n      phone: $phone\n    )\n  }\n"): typeof import('./graphql').CreateOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CheckoutOrder($input: CheckoutOrderInput!) {\n    checkoutOrder(input: $input)\n  }\n"): typeof import('./graphql').CheckoutOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFeedback($orderId: Float!, $input: [CreateFeedbackInput!]!) {\n    createFeedback(orderId: $orderId, input: $input)\n  }\n"): typeof import('./graphql').CreateFeedbackDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHome {\n    featuredProduct: products(currentItem: 10, order: DESC, sort: \"rating\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    bestSellers: products(currentItem: 10, order: DESC, sort: \"sold\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    newArrivals: products(currentItem: 10, order: DESC, sort: \"createdAt\") {\n      items {\n        id\n        feedbacks {\n          id\n        }\n        images {\n          url\n        }\n        name\n        price\n        rating\n      }\n    }\n\n    topRatedProduct: products(currentItem: 10, order: DESC, sort: \"rating\") {\n      items {\n        id\n        images {\n          url\n        }\n        name\n        price\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n\n    specialOffers: products(order: ASC, sort: \"price\", currentItem: 10) {\n      items {\n        id\n        feedbacks {\n          id\n        }\n        images {\n          url\n        }\n        name\n        price\n        rating\n      }\n    }\n  }\n"): typeof import('./graphql').GetHomeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyPurchases($search: String!) {\n    searchOrder(search: $search) {\n      orderItems {\n        userLab {\n          isActive\n          id\n          updatedAt\n          createdAt\n        }\n        product {\n          name\n          images {\n            url\n          }\n          id\n        }\n        tickets {\n          id\n        }\n        id\n      }\n      id\n      createdAt\n    }\n  }\n"): typeof import('./graphql').GetMyPurchasesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchOrder($search: String!) {\n    searchOrder(search: $search) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').SearchOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderByStatus($status: OrderStatus!) {\n    searchOrder(search: \"\", status: $status) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetOrderByStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderByToShip {\n    searchOrderByPaid: searchOrder(search: \"\", status: PAID) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n    searchOrderByDelivering: searchOrder(search: \"\", status: DELIVERING) {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetOrderByToShipDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountOrder {\n    countOrder {\n      delivering\n      delivered\n      paid\n      rated\n      received\n      unpaid\n    }\n  }\n"): typeof import('./graphql').GetCountOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHistoryOrder {\n    searchOrder(search: \"\") {\n      id\n      createdAt\n      updatedAt\n      totalPrice\n      status\n      address\n      fullName\n      phone\n      shipTime\n      payment {\n        provider\n        time\n      }\n      orderItems {\n        hasLab\n        id\n        labPrice\n        productPrice\n        quantity\n        product {\n          id\n          name\n          price\n          images {\n            url\n          }\n          lab {\n            price\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetHistoryOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RepayOrder($orderId: Float!) {\n    repayOrder(orderId: $orderId)\n  }\n"): typeof import('./graphql').RepayOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReceivedOrder($orderId: Float!) {\n    receiveOrder(orderId: $orderId) {\n      id\n    }\n  }\n"): typeof import('./graphql').ReceivedOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReOrder($orderId: Float!) {\n    reOrder(orderId: $orderId) {\n      id\n      hasLab\n      product {\n        id\n        name\n        price\n        images {\n          url\n        }\n        lab {\n          price\n        }\n      }\n      quantity\n    }\n  }\n"): typeof import('./graphql').ReOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProduct($id: Float!) {\n    product(id: $id) {\n      categories {\n        id\n        name\n        type\n        title\n      }\n      images {\n        id\n        url\n      }\n      description\n      id\n      name\n      price\n      rating\n      sold\n      feedbacks {\n        note\n        createdAt\n        id\n        rating\n        user {\n          fullName\n        }\n      }\n      lab {\n        price\n      }\n    }\n    products(currentItem: 10, order: ASC, sort: \"price\") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFeaturedProduct {\n    products(currentItem: 10, order: ASC, sort: \"price\") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetFeaturedProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchProductByName($search: String!) {\n    products(search: $search) {\n      items {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchProductByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FilterAndSortingProduct(\n    $categoryIds: [Int!]!\n    $currentItem: Int!\n    $currentPage: Int!\n    $maxPrice: Int\n    $maxRating: Int\n    $minPrice: Int\n    $minRating: Int\n    $order: SortOrder!\n    $search: String!\n    $sort: String!\n  ) {\n    products(\n      categoryIds: $categoryIds\n      currentItem: $currentItem\n      currentPage: $currentPage\n      maxPrice: $maxPrice\n      maxRating: $maxRating\n      minPrice: $minPrice\n      minRating: $minRating\n      order: $order\n      search: $search\n      sort: $sort\n    ) {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').FilterAndSortingProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyTickets {\n    myTickets {\n      id\n      createdAt\n      title\n      status\n      senderComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').GetMyTicketsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTicketById($ticketId: Float!) {\n    ticket(ticketId: $ticketId) {\n      id\n      createdAt\n      closedAt\n      title\n      status\n      senderComment\n      replierComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n      replyImages {\n        id\n        url\n      }\n      images {\n        id\n        url\n      }\n    }\n  }\n"): typeof import('./graphql').GetTicketByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStaffTicketsByStatus($status: TicketStatus) {\n    myTickets(status: $status) {\n      id\n      createdAt\n      title\n      status\n      senderComment\n      orderItem {\n        id\n        product {\n          name\n          images {\n            url\n          }\n        }\n      }\n      category {\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').GetStaffTicketsByStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReplyTicket($comment: String!, $ticketId: Float!, $images: [File!]!) {\n    replyTicket(comment: $comment, ticketId: $ticketId, images: $images) {\n      id\n    }\n  }\n"): typeof import('./graphql').ReplyTicketDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendResetPasswordOTP($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n"): typeof import('./graphql').SendResetPasswordOtpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n"): typeof import('./graphql').GetTokenResetPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n"): typeof import('./graphql').ResetPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginWithGoogle($code: String!) {\n    loginWithGoogle(code: $code) {\n      access_token\n    }\n  }\n"): typeof import('./graphql').LoginWithGoogleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      createdAt\n      email\n      fullName\n      id\n      phone\n      role\n      status\n      updatedAt\n      address\n    }\n  }\n"): typeof import('./graphql').MeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMe($address: String, $email: String, $fullName: String, $phone: String) {\n    updateUser(address: $address, email: $email, fullName: $fullName, phone: $phone) {\n      id\n    }\n  }\n"): typeof import('./graphql').UpdateMeDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
